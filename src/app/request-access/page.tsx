import RequestAccess from "../../views/RequestAccess";

export const metadata = {
  title: "Request Access",
  description: "Request secure access to Calaya Taskly for operations, reporting, and collaboration workflows.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RequestAccessPage() {
  return <RequestAccess />;
}
