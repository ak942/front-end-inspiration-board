import React from 'react'
import './App.css';
import BoardList from './components/BoardList';
import Board from './components/Board';
import BoardForm from './components/BoardForm';
import CardForm from './components/CardForm';
import axios from 'axios';

const sample_board = [{
    board_id: 1,
    title: "Board1",
    owner: "Owner1" },
  {
    board_id: 2,
    title: "Board2",
    owner: "Owner2"
  }
]
const sample_card =[{
    card_id : 1,
    board_id : 1,
    message : "SampleCard-Board1",
    likes_count: 3, },
    {
      card_id : 4,
      board_id : 1,
      message : "SampleCard-Board1",
      likes_count: 3, },
      {
    card_id : 5,
    board_id : 1,
    message : "SampleCard-Board1",
    likes_count: 3, },
  {
    card_id: 2,
    board_id: 1,
    message: "SampleCard2-Board1",
    likes_count: 1 },
  {
    card_id: 3,
    board_id: 2,
    message: "SampleCard3-Board2",
    likes_count: 3
  }

]

function App() {
  const [boards, setBoards] = React.useState(sample_board)
  const [selectedBoard, setSelectedBoard] = React.useState({})
  const [cards, setCards] = React.useState(sample_card)

  React.useEffect(()=> {
    axios.get('https://back-end-inspo-rkak.onrender.com/boards').then((response)=> {
      setBoards(response.data)
    })
  },[])

  const increaseLikes = (id) => {
    console.log("liked")
    axios.patch(`https://back-end-inspo-rkak.onrender.com/cards/${id}/like`).then(response => {
      console.log(response)
      setCards(prevCards => {
        const updatedCards = prevCards.map(card => {
          return card.card_id === id? response.data : card
        })
        console.log("updated", updatedCards)
        return updatedCards
      })
    })
  }

  const selectBoard = (id) => {
    const matchedBoard = boards.find(board => board.board_id === id)
    axios.get(`https://back-end-inspo-rkak.onrender.com/boards/${id}/cards`).then((response)=> {
      setCards(response.data) 
  })
    setSelectedBoard(matchedBoard)
  }
    

  const boardList = <BoardList boards={boards} callBack={selectBoard}/>
  return (
    // <div className="App">
    <body>

      <div className ="App"> 
        <header className="App-header">Inspiration Board</header>
        <div className="container">

          <section className = "element"> {boardList} </section>

          <section className = "element">
            <div>Create New Board:</div>
            <div className = "board-form">
              <form className='form'>
                <BoardForm /> 
              </form>
            </div>
          </section>

          <section className = "element">Create New Card:
            <div className = "card-form">
                <form className='form'>
                  <CardForm /> 
                </form>
              </div>
          </section>
        </div>

        <section> 
          <Board cards = {cards} boardsData ={selectedBoard} increaseLikes = {increaseLikes}/>
        </section>
      </div>
    </body>
  );
};

export default App;
