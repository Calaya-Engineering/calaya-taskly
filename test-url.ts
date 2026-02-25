
try {
    const url1 = new URL("http://localhost:3000/api/documents?");
    console.log("URL 1 searchParams:", url1.searchParams.toString());

    const url2 = new URL("/api/documents?");
} catch (e) {
    console.log("URL 2 failed as expected:", e.message);
}
