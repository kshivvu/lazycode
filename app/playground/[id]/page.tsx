const Page = () => {
  if (2 < 5) {
    throw new Error("Backend logic exploded 💥");
  }

  return <div>page</div>;
};

export default Page;
