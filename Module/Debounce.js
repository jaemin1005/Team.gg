function GetTime()
{
  return Date.now() || new Date.GetTime();
}
/**
 * * 2024.04.20 황재민
 * * Debounce 란, 짧은 시간 간격으로 이벤트가 연속해서 발생하면 
 * * 이벤트 랜들러를 호출하지 않다가 일정 시간이 경과한 이후에 이벤트 
 * * 핸들러가 한 번만 호출되도록 하는 기법. 
 * @param {*} func : 실핼할 콜백 함수
 * @param {*} waitTime  : 기다릴 일정 시간.
 * @returns 
 */
function Debounce(func, waitTime){

  /**
   * * time : 실행된 시간 
   * * funcId : setTimeout에서 건네받은 Id
   * * args : 콜백함수의 매개변수가 저장되는 곳
   * * context : debounce 클로저가 실행된 객체
   */
  let time;
  let funcId;
  let args;
  let context;

  /**
   * * isPass를 통하여, 일정 시간이 경과 했는지 안했는지 판단한다.
   * * calcTimer는 time이 호출될따마다 변하기 떄문에 호출함에 따라 변화된다.
   * * 일정 시간이 지나지 않는면 calcTimer만큼 다시 대기. 
   * * 시간이 경과하면 apply를 통해 해당 함수를 실행한다. 
   */
  let lazyExecute = function(){
    let calcTimer = GetTime() - time;
    let isPass = calcTimer >= waitTime 

    if(isPass)
    {
      func.apply(context,args);

      // * 초기화 :) 
      funcId = null;
      args = null;
      context = null;
      time = null;
    }

    else
    {
      funcId = setTimeout(lazyExecute, calcTimer);
    }
  }

  /**
   * * 클로저 함수
   * * 이벤트에서 실행되면, 현재 자신이 속한 객체, 매개변수를 저장, 실행된 시간을 저장
   * * 현재 setTimeout이 실행된게 없으면 lazyExecute() 함수 실행
   */
  let debounce = function(){
    return function(..._args){
      context = this;
      args = _args;
      time = GetTime();
      if(funcId == null)
      {
        funcId = setTimeout(lazyExecute, waitTime);
      }
    }
  }();

  return debounce;
}