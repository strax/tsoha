import * as React from "react";

export function withLayout<P>(Wrapped: React.ComponentType<P>): React.SFC<P> {
  return props => (
    <Layout>
      <Wrapped {...props} />
    </Layout>
  );
}

const Layout: React.SFC = props => {
  return (
    <html>
      <head>
        <title>Tsoha</title>
        <meta charSet="utf-8" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};
