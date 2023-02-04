const backendHost = import.meta.env.VITE_BACKEND_DOMAIN;
const defaultMax = 20;
const defaultOffset = 0;

async function fetchNoteAPI(
  endpoint,
  { expectedStatusCodes, params = {}, fetchOptions = {} }
) {
  const url = new URL(`${backendHost}/${endpoint}`);
  Object.keys(params).map((k) => {
    url.searchParams.append(k, params[k]);
  });
  const results = await fetch(url, fetchOptions);
  if (expectedStatusCodes && !expectedStatusCodes.includes(results.status))
    throw Error(`notes api error while fetching ${endpoint}`);
  return results;
}

export async function listNotesApi({
  max = defaultMax,
  offset = defaultOffset,
}) {
  const results = await fetchNoteAPI("", {
    expectedStatusCodes: [200],
    params: { max, offset },
  });
  return await results.json();
}

export async function getNote(id) {
  const results = await fetchNoteAPI(id, { expectedStatusCodes: [200] });
  return await results.json();
}

export async function createNoteApi({ title, content }) {
  const results = await fetchNoteAPI("post", {
    expectedStatusCodes: [201],
    fetchOptions: {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title, content }),
    },
  });
  return await results.json();
}

export async function deleteNoteApi(id) {
  return await fetchNoteAPI(id, {
    fetchOptions: { method: "DELETE" },
  });
}
