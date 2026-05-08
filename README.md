# LayoutRoutes dev issue

To reproduce issue, do the following after installing packages

1. Run `npm run dev` to generate dev types and start dev server.
1. Run `npm t` to run test. Note the resulting errors.

```
$ npm t

> my-app-16.2.6@0.1.0 test
> npm run typegen && npm run lint && npm run tsc


> my-app-16.2.6@0.1.0 typegen
> next typegen

Generating route types...
✓ Types generated successfully

> my-app-16.2.6@0.1.0 lint
> eslint


> my-app-16.2.6@0.1.0 tsc
> tsc --noEmit

.next/dev/types/validator.ts:24:44 - error TS2344: Type 'Route' does not satisfy the constraint 'LayoutRoutes'.
  Type 'import("/path/to/my-app-16.2.6/.next/dev/types/routes").LayoutRoutes' is not assignable to type 'import("/path/to/my-app-16.2.6/.next/types/routes").LayoutRoutes'.
    Type '"/%5Ffoo"' is not assignable to type 'LayoutRoutes'.

24   default: React.ComponentType<LayoutProps<Route>> | ((props: LayoutProps<Route>) => React.ReactNode | Promise<React.ReactNode> | never | void | Promise<void>)
                                              ~~~~~

.next/dev/types/validator.ts:24:75 - error TS2344: Type 'Route' does not satisfy the constraint 'LayoutRoutes'.
  Type 'import("/path/to/my-app-16.2.6/.next/dev/types/routes").LayoutRoutes' is not assignable to type 'import("/path/to/my-app-16.2.6/.next/types/routes").LayoutRoutes'.
    Type '"/%5Ffoo"' is not assignable to type 'LayoutRoutes'.

24   default: React.ComponentType<LayoutProps<Route>> | ((props: LayoutProps<Route>) => React.ReactNode | Promise<React.ReactNode> | never | void | Promise<void>)
                                                                             ~~~~~

.next/dev/types/validator.ts:67:31 - error TS2344: Type 'typeof import("/path/to/my-app-16.2.6/app/%5Ffoo/layout")' does not satisfy the constraint 'LayoutConfig<"/%5Ffoo">'.
  Types of property 'default' are incompatible.
    Type '({ children }: LayoutProps<"/_foo">) => Element' is not assignable to type 'ComponentType<LayoutProps<"/%5Ffoo">> | ((props: LayoutProps<"/%5Ffoo">) => void | ReactNode | Promise<ReactNode> | Promise<...>)'.
      Type '({ children }: LayoutProps<"/_foo">) => Element' is not assignable to type 'FunctionComponent<LayoutProps<"/%5Ffoo">>'.
        Types of parameters '__0' and 'props' are incompatible.
          Type 'LayoutProps<"/%5Ffoo">' is not assignable to type 'LayoutProps<"/_foo">'.
            Type 'LayoutProps<"/%5Ffoo">' is not assignable to type '{ params: Promise<{}>; children: ReactNode; }'.
              Types of property 'params' are incompatible.
                Type 'Promise<unknown>' is not assignable to type 'Promise<{}>'.
                  Type 'unknown' is not assignable to type '{}'.

67   type __Check = __IsExpected<typeof handler>
                                 ~~~~~~~~~~~~~~


Found 3 errors in the same file, starting at: .next/dev/types/validator.ts:24
```

The issue is related to dev types in `.next/dev/types/routes.d.ts`. Clearing `.next` directory and then re-running `npm t` produces no errors. The expectation here is that there would _not_ be issues with the dev types, possibly having the `LayoutRoutes` match between dev and prod style types.
