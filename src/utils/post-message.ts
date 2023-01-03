export enum EVENTS{
  BACK= "back",
  INIT= "init",
  MSG="msg",
  PROGRESS="progress",
  START="start",
  STOP="stop",
  SUBMIT="submit",  
}

export const init = ()=>{
  window.parent.postMessage({event:EVENTS.INIT,events:EVENTS});
}

export const postMessage = (event:EVENTS,message:Object|null)=>{
  window.parent.postMessage({event,message});
}

export const message=(callback:Function)=>{
  window.onmessage=(msg)=>{
    callback(msg);
  }
}
