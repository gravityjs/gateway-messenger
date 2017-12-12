export default function (context) {
  const errors = {
    invalidMessageUid: 'Mismatch between request and reply message uid',
    replyTimeout: 'Reply timeout reached',
  };

  const createError = error =>
    new Error(error);

  const isValidReply = (message, replyMessage) =>
    message.uid !== undefined &&
    message.uid === replyMessage.uid;

  return {
    post (frame, message, targetOrigin) {
      const requestMessage = Object.assign({
        uid: Date.now(),
        timeout: 100,
        targetOrigin: '*',
      }, message);

      return new Promise((resolve, reject) => {
        let replyTimeout;

        const replyHandler = (event) => {
          const replyMessage = event.data;

          context.removeEventListener('message', replyHandler);
          context.clearTimeout(replyTimeout);

          if (isValidReply(replyMessage, requestMessage)) {
            resolve(replyMessage);
          }

          reject(createError(errors.invalidMessageUid));
        };

        const setReplyTimeout = () => {
          replyTimeout = context.setTimeout(() => {
            context.removeEventListener('message', replyHandler);
            reject(createError(errors.replyTimeout));
          }, requestMessage.timeout);
        };

        context.addEventListener('message', replyHandler, false);
        frame.postMessage(requestMessage, targetOrigin || requestMessage.targetOrigin);

        setReplyTimeout();
      });
    },
  };
}
