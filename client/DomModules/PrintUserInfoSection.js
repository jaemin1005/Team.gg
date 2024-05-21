export class PrintUserInfoSection extends PrintAllPlayerSection{

  constructor(parentObj, participant) {
    super(parentObj, participant)
    this.nodeLength = super.getLength()
    this.participant = participant
  }

  searchElement(){
    this.champ = document.getElementById("UserChampionDiv")
    this.rune = document.getElementById("UserSpellDiv")
    this.spell = document.getElementById("UserRuneDiv")
    this.kda = document.getElementById("UserKda")
  }

  inputContent(){
    let champImg = this.getChampionImg(this.participant)
    let runeImg = this.getRuneImg(this.participant)

  }

  async getRuneImg(user){
    let mainRuneStyle = user.perks.styles[0].style
    let mainRune = user.perks.styles[0].selections[0].perk
    let subRuneStyle = user.perks.styles[1].style

    let res1 = await fetch(`/runeImg/${mainRuneStyle}/${mainRune}`)
    let res2 = await fetch(`/runeImg/${subRuneStyle}`)

    let blob1 = await res1.blob()
    let blob2 = await res2.blob()

    let url1 = await URL.createObjectURL(blob1)
    let url2 = await URL.createObjectURL(blob2)

    return url1,url2
  }


  async getSpellImg(user){

    let spell1 = user.perks.styles[0].style
    let spell2 = user.perks.styles[0].selections[0].perk

    let res1 = await fetch(`/spellImg/${spell1}`)
    let res2 = await fetch(`/spellImg/${spell2}`)
    

    let blob1 = await res1.blob()
    let blob2 = await res2.blob()

    let url1 = await URL.createObjectURL(blob1)
    let url2 = await URL.createObjectURL(blob2)

    return url1,url2    
  }


  async getItemImg(user){
    let imgUrlArr = []
    for(let i = 0; i < 6; i++){
      let item = user[`item${i}`]
      let res = await fetch(`/itemImg/${item}`);
      let blob = await res.blob()
      let url = await URL.createObjectURL(blob)
      imgUrlArr.push(url)
    }
  }
}