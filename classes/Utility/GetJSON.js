export default class GetJSON {

  constructor(url, onComplete = null) {
    this._url = url;
    this._onComplete = onComplete;
  }

  async getData(post){
    try{
      let response = await fetch(this._url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
      });
      let responseJSON = await response.json();
      if(this._onComplete != null && typeof(this._onComplete) === "function"){
        this._onComplete(responseJSON);
      }
    }catch(error){
      console.log(error);
    }
  }
}
