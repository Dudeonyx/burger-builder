export function generateErrorMessage(
  error:
    | (Error & {
        [x: string]: any;
      })
    | null,
) {
  if (!error) {
    return '';
  }

  let defaultMessage: string;

  if (error.response) {
    if (error.response.data.error.message) {
      defaultMessage = error.response.data.error.message;
    } else {
      defaultMessage = error.response.data.error;
    }
  } else {
    defaultMessage = error.message;
  }

  switch (defaultMessage) {
    case 'Permission denied':
      return 'You are not logged in!';

    case 'Network Error':
    case 'Request failed with status code 401':
      return 'A Network Error has Ocurred, please refresh the page';

    case 'EMAIL_EXISTS':
      return 'This email address already exists in our database. \n Please Login or alternatively Signup using a different email address.';

    default:
      return defaultMessage;
  }
}

// getTotalPrice({});
