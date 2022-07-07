import React, {Component} from "react";
import Draggable from 'react-draggable'
//import GridLines from 'react-gridlines';


class App extends Component {

  state = {
    cardCount: 0,
    aktCardCount: 0,
    karten: [],
    RndmChecked: true,
    deletable: true,
    abstandL: 100,
    abstandT: 250
  }

  addCard = () => {
    var aktKarten = this.state.karten
    const test = this.state.cardCount
    var numbers
    if(this.state.RndmChecked) numbers = Math.floor(Math.random() * 100)
    else numbers = this.state.cardCount

    var abstandL = this.state.abstandL
    var abstandT = this.state.abstandT

    aktKarten.push(
      <Draggable key={this.state.cardCount}>
        <div id={this.state.cardCount} style={{display: "flex", justifyContent: "center", alignItems: "center", left: abstandL+"px", top: abstandT+"px", position: "absolute", width: "200px", height: "140px", backgroundColor: "rgb("+(Math.random()*150+100)+", "+(Math.random()*150+100)+", "+(Math.random()*150+100)+")"}}>
          <button 
            style={{position: "absolute", fontSize: "0.7em", marginLeft: "150px", marginTop: "-5.6em", marginRight: "-10px", backgroundColor: "transparent", borderColor: "transparent"}} 
            onClick={() => this.removeCard(test)}>✖
          </button>
          <p style={{fontSize: "3em", marginTop: "25px"}}>{numbers}</p>
        </div>
      </Draggable>
    )

    abstandL += 220
    if(abstandL+220> window.innerWidth){
      abstandL = 100
      abstandT += 200
    }

    this.setState({ 
      cardCount: this.state.cardCount + 1,
      aktCardCount: this.state.aktCardCount + 1,
      karten: aktKarten,
      abstandL: abstandL,
      abstandT: abstandT
    })
  }

  removeCard = (id) => {
    if(this.state.deletable === true){
      console.log(id);
      console.log(this.state);
      document.getElementById(id).style.display = "none"
      this.setState({
        aktCardCount: this.state.aktCardCount -1
      })
    }
  }

  cards = () => {
    return this.state.karten
  }

  handleRandomChange(e) {
    let isChecked = e.target.checked;
    this.setState({ RndmChecked: isChecked })
  }

  handleDeletableChange(e) {
    let isChecked = e.target.checked;
    this.setState({ deletable: isChecked })
  }

  reset() {
    this.setState({
      cardCount: 0,
      aktCardCount: 0,
      karten: [],
      abstandL: 100,
      abstandT: 250
    })
  }

  darkMode() {
    var texts = document.getElementsByClassName("text")
    if(document.body.style.backgroundColor === "rgb(0, 0, 17)"){
      document.body.style.backgroundColor = "white"
      for(let i = 0; i < texts.length; i++){
        texts[i].style.color = "black"
      }
      document.getElementById("darkmodeBtn").innerHTML = "🌑"
    }
    else {
      document.body.style.backgroundColor = "rgb(0, 0, 17)"
      for(let i = 0; i < texts.length; i++){
        texts[i].style.color = "white"
      }
      document.getElementById("darkmodeBtn").innerHTML = "☀️"
    }
  }


  render() {
    console.log(this.state);
    return (
      <div className="container">
        <button id="darkmodeBtn" style={{backgroundColor: "transparent", borderColor: "transparent", float: "right"}} onClick={() => this.darkMode()}>🌑</button>
        <h1 id="headline" className="text">Karten</h1>
        <button onClick={this.addCard}>Karte hinzufügen</button> {""}
        <span><button onClick={() => this.reset()}>Zurücksetzen</button></span>
        <span className="text" style={{float: "right"}}>
          <input type="checkbox" defaultChecked="true" style={{width: "20px", height: "20px"}} onChange={e => this.handleRandomChange(e)}></input> Zufällige Nummern  
          {""} <input type="checkbox" defaultChecked="true" style={{width: "20px", height: "20px"}} onChange={e => this.handleDeletableChange(e)}></input> Karten löschbar
        </span>
        <p id="cardCounter" className="text" style={{fontSize: "0.6em"}}>Anzahl erstellter Karten: {this.state.aktCardCount} ({this.state.cardCount} insg.)</p>
        <this.cards/>
      </div>
    )
  }
}


export default App