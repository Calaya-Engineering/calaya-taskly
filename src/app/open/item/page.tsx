import OpenItemRedirect from "./OpenItemRedirect";

type SearchParams = Record<string, string | string[] | undefined>;

type OpenItemPageProps = {
  searchParams?: Promise<SearchParams>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function OpenItemPage({ searchParams }: OpenItemPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const type = getSingleParam(params?.type) || "notification";
  const id = getSingleParam(params?.id) || "";

  return <OpenItemRedirect type={type} id={id} />;
}
