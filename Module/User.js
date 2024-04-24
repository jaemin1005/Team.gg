let fullName = require("./FullName");

let CreateUser = (function(){
  function User(puuId, gameName, tag)
  {
    this.puuid = puuId;
    this.gameName = gameName;
    this.tagLine = tag;
  }
  User.prototype.FullName = () => {
    return (this.name + "#" + this.tag);
  }
 return User;
}());


class User
{
  constructor(obj)
  {
    this.puuid = obj.puuid;
    this.gameName = obj.gameName;
    this.tagLine = obj.tagLine;
  }  
}
