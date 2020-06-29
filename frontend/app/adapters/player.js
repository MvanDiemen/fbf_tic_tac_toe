
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };
}
