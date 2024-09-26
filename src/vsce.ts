export async function getExtVersion(
  publisher: string,
  extension: string
): Promise<string> {
  try {
    const response = await fetch(
      'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json;api-version=3.0-preview.1',
        },
        body: JSON.stringify({
          flags: 914,
          filters: [
            {
              criteria: [{ filterType: 7, value: `${publisher}.${extension}` }],
            },
          ],
        }),
      }
    )

    const data = await response.json()
    const versions = data.results[0].extensions[0].versions
    return versions[0].version
  } catch (error) {
    console.error('Error fetching extension version:', error)
  }
}
