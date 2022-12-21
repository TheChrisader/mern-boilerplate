import { useQuery } from "@tanstack/react-query";

function App() {
  const { status, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
        res.json()
      );
    },
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  } else if (error instanceof Error && status === "error") {
    return <span>Error: {error.message}</span>;
  } else {
    return <div className="App">Response: {JSON.stringify(data)}</div>;
  }
}

export default App;
