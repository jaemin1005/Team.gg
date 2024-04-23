let CreateUser = (function(){
  function User(puuId, gameName, tag)
  {
    this.puuId = puuId;
    this.gameName = gameName;
    this.tag = tag;
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
    this.puuId = obj.puuid;
    this.gameName = obj.gameName;
    this.tag = obj.tagLine;
  }  
  
  fullName(){
    return this.gameName + '#' + this.tag;
  }
}

module.exports = User;