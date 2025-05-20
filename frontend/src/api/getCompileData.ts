export async function getCompileData() {
  const response = await fetch('http://127.0.0.1:8000/get_compile_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studyid: "PDS2014",
      path_db: "/Users/amin/public_SEND.db",
      fake_study: false,
      use_xpt_file: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
}
