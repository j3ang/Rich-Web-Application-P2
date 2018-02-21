(function() {
class PageComponent extends React.Component{
	render() {
		return <PageWrapper/>;
	}
}

class PageWrapper extends React.Component {
	render() {
		return(
			<div id="PageWrapper">
				<PageTitle/>
				<EmployeesTable/>
			</div>
		);
	}
}

class PageBtn extends React.Component {
	render() {
		return (
			<div id="BtnColumn">
				<button onClick={this.props.clickHandler} id="LoadBtn">Load Data</button>
			</div>
		);
	}
}

class EmployeesTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {employees: []};
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount(){
		this.loadData();
  }

	render() {
		const employees = this.state.employees.map((employee, i) => {
      return <EmployeesTableRow key={"row"+i} employee={employee} />
    });

			return (
				<div>
				<PageBtn clickHandler={this.loadData}/>
				<table id="EmployeesTable">
					<tbody>
						<EmployeesTableHeader />
							<RowWrapper>
								{employees}
							</RowWrapper>
					</tbody>
				</table>
				</div>
			);
	}

	loadData(){
		fetch('http://libertyville.rice.iit.edu/scripts/4565_lab3.php')
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					this.setState({employees: data});
				});
	}
}

class EmployeesTableHeader extends React.Component {
	constructor(props) {
			super(props);
	}

	render() {
		return (
			<tr id="EmployeesTableHeader">
				<th>ID</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Gender</th>
				<th>Title</th>
				<th>Active</th>
			</tr>
		);
	}


}

class RowWrapper extends React.Component {
		render() {
			return this.props.children;
		}
}

class EmployeesTableRow extends React.Component {
		constructor (props) {
			super(props);
		}

		render() {
			const activeStats = this.props.employee.active;
			let td = null;
			if (this.props.employee.active) {
				td = Active(activeStats);
			} else{
				td = InActive(activeStats);
			}

			return(
				<tr>
					<td id="rowId">{this.props.employee.id}</td>
					<td>{this.props.employee.first_name}</td>
					<td>{this.props.employee.last_name}</td>
					<td>{this.props.employee.gender}</td>
					<td>{this.props.employee.email}</td>
					<td>{this.props.employee.title}</td>
					{td}
				</tr>
			);
		}
}

class PageTitle extends React.Component{
	render(){
		return (
			<div id="titles">
				<h1>ITMD 465 - Project 2</h1>
				<h1>jwang206@hawk.iit.edu</h1>
			</div>
			);
	}
}

function InActive(props) {
  return (
    <td class="status" id="InActive">
      No
    </td>
  );
}

function Active(props){
	return (
		<td class="status" id="Active">
      Yes
    </td>
	);
}

ReactDOM.render(<PageComponent id="root" />, document.getElementById('root'));
})();
