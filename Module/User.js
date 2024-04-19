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
  constructor(puuId, gameName, tag)
  {
    this.puuId = puuId;
    this.gameName = gameName;
    this.tag = tag;
  }  
  
  fullName(){
    return this.gameName + '#' + this.tag;
  }
}

module.exports = CreateUser;