function SubProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Sub Profile</h1>
      <hr />
      <p>
        Welcome to sub-profile Page:{" "}
        <span className="text-blue-600">{params.id}</span>
      </p>
    </div>
  );
}

export default SubProfile;
