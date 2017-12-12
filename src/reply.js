export default function (context) {
  return (eventName, message) => {
    context.addEventListener('message', (event) => {
      const requestMessage = event.data;

      // TODO: Support regex
      if (eventName && requestMessage.name !== eventName) {
        return;
      }

      const replyMessage = Object.assign({
        replyTo: {
          uid: requestMessage.uid,
          name: requestMessage.name,
        },
      }, message);

      context.parent.postMessage(replyMessage, event.origin);
    });
  };
}
