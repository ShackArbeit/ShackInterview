// class Count extends React.Component { 
//     constructor(props) { 
//     super(props); 
//     this.state = { count: 0 }; 
//     this.handleAddCount = this.handleAddCount.bind(this); 
//     } 
//     handleAddCount(){ 
//     this.setState({ count: this.state.count + 1 }); 
//     this.setState({ count: this.state.count + 1 }); 
//     this.setState({ count: this.state.count + 1 }); 
//     } 
//       render() { 
//         return ( 
//           <div> 
//             <h2>{this.state.count}</h2> 
//             <button onClick={this.handleAddCount}>Add</button> 
//           </div> 
//         ); 
//       } 
//     }

// Explain from above：
/** 
    // the problem is coming from setState is a nature ""asynchronous""" function 
    *!  In React ,in class components, "props" data itself is immutable, but key word "this" is not. 
    ** Whenever a class component re-renders, React will ""mutate"" the new version of the entire package of props into this to replace the old version of props.
    * TODO: Therefore, when you obtain the content of props again using this.props after re-render, 
    * TODO:you will get the props data of the "last render". 
    // This behavior will cause that when the access action is written in some asynchronous event processing, the event that should use the "old version data" mistakenly reads the "latest version data".
*/
/**
    // To solve we can give a parmater 'updater function'
    *! updater function will be injected with an old value as a parameter when it is actually executed, and then must return a "new value".  
    class Count extends React.Component {
        constructor(props) {
            super(props);
            this.state = { count: 0 };
            this.handleAddCount = this.handleAddCount.bind(this);
        }
        handleAddCount() {
        *! Apply 'updater function' here 
            this.setState((prevState) => ({ count: prevState.count + 1 }));
            this.setState((prevState) => ({ count: prevState.count + 1 }));
            this.setState((prevState) => ({ count: prevState.count + 1 }));
        }
        render() {
            return (
            <div>
                <h2>{this.state.count}</h2>
                <button onClick={this.handleAddCount}>Add</button>
            </div>
            );
        }
        }
 
 */

/**  Additional Instructions
    *! If the above problematic Code is converted into functional component form, it will be as follows
    // function Count() {
    //     const [count, setCount] = React.useState(0);
      
    //     const handleAddCount = () => {
    //       setCount(count + 1);
    //       setCount(count + 1);
    //       setCount(count + 1);
    //     };
      
    //     return (
    //       <div>
    //         <h2>{count}</h2>
    //         <button onClick={handleAddCount}>Add</button>
    //       </div>
    //     );
    //   }
*/ 