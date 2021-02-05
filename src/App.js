import React from 'react';

import styles from './App.module.css';

import Tareas from './Archivos/Tareas.json';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    date = (d) => {
        var q = new Date(d);
        return parseInt(
            q.getFullYear().toString().concat(
                '0'.concat(
                    (q.getMonth() + 1).toString().concat(
                        '0'.concat(
                            q.getDate().toString()
                        )
                    )
                )
            )
        );
    }

    componentDidMount() {
        this.setState({
            data: Tareas.tareas
        });
    }

    render() {
        var p = new Date();
        var today = parseInt(
                        p.getFullYear().toString().concat(
                            '0'.concat(
                                (p.getMonth() + 1).toString().concat(
                                    '0'.concat(
                                        p.getDate().toString()
                                    )
                                )
                            )
                        )
                    );

        return(
            <div className = { styles.body }>
                <table className = { styles.table }>
                    <tr>
                        <th>Fecha Peticion</th>
                        <th>Fecha Entrega</th>
                        <th>Materia</th>
                        <th>Descripcion</th>
                        <th>Plataforma</th>
                    </tr>
                    {
                        this.state.data.sort((a, b) => (a.entrega > b.entrega) ? 1 : -1).map((tarea, id) => (
                            (today - this.date(tarea.entrega) < -5) ? (
                                <tr key = { id } className = { styles.green }>
                                    <td>{ tarea.peticion }</td>
                                    <td>{ tarea.entrega }</td>
                                    <td>{ tarea.materia }</td>
                                    <td>{ tarea.descripcion }</td>
                                    <td><a href={ tarea.enlace }>{ tarea.plataforma }</a></td>
                                </tr> ) :
                                (today - this.date(tarea.entrega) < -2) ? (
                                    <tr key = { id } className = { styles.yellow }>
                                        <td>{ tarea.peticion }</td>
                                        <td>{ tarea.entrega }</td>
                                        <td>{ tarea.materia }</td>
                                        <td>{ tarea.descripcion }</td>
                                        <td><a href={ tarea.enlace }>{ tarea.plataforma }</a></td>
                                    </tr> ) :
                                    (today - this.date(tarea.entrega) <= 0 ) ? (
                                        <tr key = { id } className = { styles.red }>
                                            <td>{ tarea.peticion }</td>
                                            <td>{ tarea.entrega }</td>
                                            <td>{ tarea.materia }</td>
                                            <td>{ tarea.descripcion }</td>
                                            <td><a href={ tarea.enlace }>{ tarea.plataforma }</a></td>
                                        </tr> ) : (
                                        <tr key = { id } className = { styles.lost }>
                                            <td>{ tarea.peticion }</td>
                                            <td>{ tarea.entrega }</td>
                                            <td>{ tarea.materia }</td>
                                            <td>{ tarea.descripcion }</td>
                                            <td><a href={ tarea.enlace }>{ tarea.plataforma }</a></td>
                                        </tr> )
                        ))
                    }
                </table>
            </div>
        )
    }
}