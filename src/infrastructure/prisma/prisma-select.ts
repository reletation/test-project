import type { GraphQLResolveInfo } from "graphql";
import { parseResolveInfo, type ResolveTree } from 'graphql-parse-resolve-info';

type Fields = Record<string, ResolveTree>;

export function toPrismaSelect(graphqlTypeName: string, info: GraphQLResolveInfo) {
    const tree = parseResolveInfo(info) as ResolveTree | undefined;
    return build(tree?.fieldsByTypeName[graphqlTypeName] ?? {});
}

function build(fields: Fields): Record<string, unknown> {
    const select: Record<string, any> = {};

    for (const [name, field] of Object.entries(fields)) {
        const childTypes = Object.keys(field.fieldsByTypeName);

        if (childTypes.length === 0) {
            select[name] = true;
            continue;
        }

        const child: Record<string, unknown> = {};

        for (const type of childTypes) {
            Object.assign(child, build(field.fieldsByTypeName[type]));
        }

        select[name] = { select: child };
    }

    return select;
}