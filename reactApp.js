function Team(props) {
    let shotPercentageDiv
    if (this.state.shots) {

        const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
        shotPercentageDiv = (
            <div>
                <strong>Shooting %: {shotPercentage} </strong>
            </div>
        )
    }

    return (
        <div className="Team">
            <h2>{this.props.name}</h2>

            <div className="identity">
                <img src={this.props.logo} alt={this.props.name} />
            </div>

            <div>
                <strong>Shots:</strong> {this.state.shots}
            </div>

            <div>
                <strong>Score:</strong> {this.state.score}
            </div>

            {shotPercentageDiv}

            <button onClick={this.shotHandler}>Shoot!</button>
        </div>
    )
}

function Scoreboard(props) {
    return (
        <div className="Scoreboard">
            <div className="TeamStats">
                <h3>Visitors</h3>
            </div>

            <h3>Scoreboard</h3>

            <div Classname="TeamStats">
                <h3>Home</h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>

        </div>
    )
}


class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shots: 0,
            score: 0
        }

        this.shotSound = new Audio('BOUNCE+1.wav')
        this.scoreSound = new Audio('basket.wav')
    }


    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 100)
        }

        this.setState((state, props) => ({
            shots: state.shots + 1,
            score
        }))
    }

    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }))
    }

    render() {
        return (
            <div className="Game">
                <Scoreboard
                    visitingTeamStats={this.state.homeTeamStats}
                    homeTeamStats={this.state.homeTeamStats}
                />


                <h1>Welcome to {this.props.venue}</h1>
                <div className="stats">
                    <Team
                        name={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logSrc}
                        stats={this.state.visitingTeamStats}
                        shotHandler={() => this.shoot('visiting')}
                    />

                    <div className="versus">
                        <h1>VS</h1>
                        <div>
                            <strong>Resets:</strong> {this.state.resetCount}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
                    </div>

                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}
                    />
                </div>
            </div>
        )
    }
}



function App(props) {
    const Cheetahs = {
        name: 'Ypsi Cheetahs',
        logoSrc: 'Cheetahs.jpg'
    }

    const lemurs = {
        name: 'Belleville Lemurs',
        logoSrc: 'lemurs.jpg'
    }

    const antelope = {
        name: 'Ann Arbor Antelopes',
        logoSrc: 'Antelope.jpg'
    }

    const ravens = {
        name: 'Romulus Ravens',
        logoSrc: 'Ravens.jpg'
    }

    return (
        <div className="App">
            <Game
                venue="The Big House"
                homeTeam={Cheetahs}
                visitingTeam={lemurs}
            />
            <Game
                venue="Belleville Lake Arena"
                homeTeam={antelope}
                visitingTeam={ravens}
            />
        </div>
    )
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
)