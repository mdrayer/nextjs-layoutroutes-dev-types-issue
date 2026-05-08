function FooLayout({ children }: LayoutProps<"/_foo">) {
  return (
    <div>
      <p>
        Layout for <code>_/foo</code> path.
      </p>
      {children}
    </div>
  );
}

export default FooLayout;
