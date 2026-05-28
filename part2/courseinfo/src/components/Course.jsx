const Header = (props) => <h2>{props.courseName}</h2>

const Content = (props) => props.parts.map(part => <Part key={part.id} part={part} />)

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Total = (props) => <b>Total of {props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</b>

export const Course = (props) => (
  <div>
    <Header courseName={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>
)
