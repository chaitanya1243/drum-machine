
const bankOne = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];
  
const bankTwo = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            volume: .5,
            display: 'display',
            bank: bankOne,
            keyCodeMap: {}
        }
        this.setDisplay = this.setDisplay.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.triggerKey = this.triggerKey.bind(this)
        this.updateVolume = this.updateVolume.bind(this)
        this.updateKeyCodeMap = this.updateKeyCodeMap.bind(this)
    }
    handleClick(event){
        var audioId = event.target.innerText
        this.setDisplay(event.target.id)
        document.getElementById(audioId).currentTime = 0
        document.getElementById(audioId).play()
    }
    componentDidMount(){
        document.addEventListener("keypress", this.triggerKey)
        this.updateKeyCodeMap()
    }
    updateKeyCodeMap(){
        this.setState(state => {
            var map = {}
            for(let i of state.bank){
                map[i.keyTrigger] = i.id
            }
            return {keyCodeMap: map}
        })
    }
    triggerKey(event){
        var id = String.fromCharCode(event.keyCode).toUpperCase()
        var el = document.getElementById(id)
        if(el){
            this.setDisplay(this.state.keyCodeMap[id])
            el.currentTime = 0
            el.play()
        }
    }
    updateVolume(event){
        this.setState({
            volume: event.target.value
        })
        var li = document.getElementsByClassName('clip')
        for (let i of li)
        i.volume = event.target.value
    }
    setDisplay(text){
        this.setState({
            display: text
        })
    }
    render(){
        return(
            <div id="drum-machine">
            <div className="wrapper">{
            this.state.bank.map((i)=>{
                return(
                    <DrumPad id={i.id} src={i.url} content={i.keyTrigger} volume={this.state.volume} handleClick={this.handleClick}/>
                )
            })
            }
            </div>
            <Display display={this.state.display} />
            <input type="range" step="0.01" min="0" max="1" value={this.state.volume} onChange={this.updateVolume}></input>
            </div>
        )
    }
}

const DrumPad = (props) => {
   return(
    <button className="drum-pad" id={props.id} onClick={props.handleClick}>
    {props.content}
    <audio className="clip" id={props.content} src={props.src} volume={props.volume}/>
    </button>
   )
}
const Display = (props) => <div id='display'>{props.display}</div>

ReactDOM.render(<App />, document.getElementById('root'))