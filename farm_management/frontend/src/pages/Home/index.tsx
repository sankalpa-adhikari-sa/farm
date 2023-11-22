function Home() {
  return (
    <div>
      Home to prevent deletion if has relation with a "Delete API" rule: for
      preventing resource collection deletion if resource usage has resource
      realation field use:
      <p>
        Allow only if : (resource_usage resource has no matching realtional
        (resource field id )to (collection resource di))
      </p>
      @collection.resource_usage.resource.id != id
    </div>
  );
}

export default Home;
