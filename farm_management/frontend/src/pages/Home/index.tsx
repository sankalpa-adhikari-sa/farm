function Home() {
  return (
    <div>
      Home to prevent deletion if has relation with a "Delete API" rule:
      @collection.another.rel != id
    </div>
  );
}

export default Home;
