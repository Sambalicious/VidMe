

//import * as Sentry from '@sentry/browser';



function init(){
  //  Sentry.init({dsn: "https://188bf203a8b74927bde7646844e7e8f5@sentry.io/2521820"});
}



function log(error){
   // Sentry.captureException(error);
   console.log(error);
}


export default {
    init,
     log
};
