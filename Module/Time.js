class Time {
  
  constructor()
  {
    this.date = new Date();
  }

  GetTime()
  {
    return date.now() || new Date.GetTime();
  }

  GetLogFileName()
  {
    return "log/" + this.date.getFullYear() + "-" + (this.date.getMonth()+1).toString().padStart(2, "0") + "-" + this.date.getDay().toString().padStart(2, "0") + "-LOG.txt";
  }

  GetLogline()
  {
    return "[" + this.date.getHours().toString().padStart(2, "0") + ":" + this.date.getMinutes().toString().padStart(2, "0") + ":" + this.date.getSeconds().toString().padStart(2, "0") + "] ";
  }
}

const time = new Time();
module.exports = time;