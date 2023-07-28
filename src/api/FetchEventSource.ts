class FetchEventSource {
  private abortController: AbortController | null = null;

  startFetchEvent(url: string, body: any, onMessage: (res: string) => void, onEnd: () => void, onError: (data: any) => void, headers = {}) {
    const eventController = new AbortController();
    this.abortController = eventController;
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: Object.assign({}, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsInBob25lIjoiMTg4MTkzMTA0ODgiLCJpZCI6MTgsImlhdCI6MTY5MDM0MDUwNiwiZXhwIjoxNjkwNDI2OTA2fQ.iol2hbgdGnmbRtsxDHn-NbXH1fgUapZpX4Wg6FDDsw0'
      }, headers),
      signal: this.abortController.signal,
    };
    fetch(url, fetchOptions).then((response: any) => {

      const reader = response.body.getReader();
      reader.read().then(function processResult(result: any) {
        if (result.done) {
          onEnd()
          return;
        }
        const decoder = new TextDecoder();
        const receivedString = decoder.decode(result.value, { stream: true });
        onMessage(receivedString)
        return reader.read().then(processResult);
      });
      return response;
    }).catch(() => {
      onError({ code: 201, message: '服务器异常' })
    });
  }
  stopFetchEvent() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }
}
export default new FetchEventSource()
