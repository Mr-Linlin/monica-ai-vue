import { fetchEventSource } from '@microsoft/fetch-event-source';

class EventController {
  private eventController: AbortController | null = null;

  public startFetchEvent = (url: string, body: string, outputCallback: (res: string) => void, chatEnd: () => void): void => {
    const eventController = new AbortController();
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }

    this.eventController = eventController;
    fetchEventSource(`http://localhost:7003/api${url}`, {
      method: 'POST',
      headers,
      body,
      signal: eventController.signal,
      onclose: () => {
        console.log('onclose');
        chatEnd();
      },
      onerror: (err) => {
        console.log('err', err);
        chatEnd();
      },
      onmessage: (response) => {
        // console.log(response.data)
        const data = decodeURIComponent(response.data.replace(/\+/g, '%20'));
        outputCallback(data)

      },
    });
  };

  public stopFetchEvent = (): void => {
    if (this.eventController) {
      this.eventController.abort();
      this.eventController = null;
    }
  };
}
export default new EventController()
