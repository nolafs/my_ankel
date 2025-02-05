function forceDownload(blob: string, filename: string): void {
  const a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export const Download = (href: string): void => {
  const url = href;
  if (!url) {
    console.error('URL is undefined');
    return;
  }
  const name = decodeURI(GetFileName(url)?.split('.')[0] ?? '');
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: 'cors',
  })
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, name);
    })
    .catch(e => console.error(e));
};

export const GetFileName = (link: string): string => {
  if (!link) return '';
  const splitLink = link.split('/');
  if (splitLink.length === 0) return '';
  return splitLink[splitLink.length - 1] ?? '';
};
