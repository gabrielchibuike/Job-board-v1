export function downloadFile(URL: string | URL | Request, fileN: string) {
  fetch(URL)
    .then((res) => res.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(new Blob([blob]));
      const clickLink = document.createElement("a");
      clickLink.href = blobUrl;
      clickLink.download = fileN;
      document.body.appendChild(clickLink);

      clickLink.click();

      document.body.removeChild(clickLink);
    });
}
