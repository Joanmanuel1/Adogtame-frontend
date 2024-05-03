import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Animal } from '../models/usuarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  //API_URI = 'https://adogtame-backend.up.railway.app/user';
  //API_URI = 'http://localhost:3000/user';
  API_URI = 'https://adogtame-backend.onrender.com/user';

  constructor(private http: HttpClient, private router: Router) {}
  logued$ = new EventEmitter<string>(); //Para comprobar si esta logueado el usuario
  revelarBusquedaRapida$ = new EventEmitter<string>();
  revelarBusquedaRapida: boolean = false;
  user = { id: '' };
  cargarAnimalDatos$ = new EventEmitter<string>();
  cargarAnimalIntereses$ = new EventEmitter<string>();
  cargarTerminado$ = new EventEmitter<string>();
  cargarAnimalEstado$ = new EventEmitter<string>();
  rol$ = new EventEmitter<string>();
  rol: any = '';

  notificacionesListar(id: string) {
    return this.http.get(`${this.API_URI}/notificacionesListar/${id}`); //Buscar los id de los animales del usuario logueado
  }

  notificaciones$ = new EventEmitter<string>();

  notificacionesConteo(id: string) {
    return this.http.get(`${this.API_URI}/notificacionesConteo/${id}`); //Buscar los id de los animales del usuario logueado
  }

  notificacionesVistas(id: string) {
    return this.http.get(`${this.API_URI}/notificacionesVistas/${id}`); //Buscar los id de los animales del usuario logueado
  }

  listarUsuarios() {
    return this.http.get(`${this.API_URI}/list`);
  }

  listarAnimales() {
    return this.http.get(`${this.API_URI}/listAnimals`);
  }

  listarAnimalesAdoptados() {
    return this.http.get(`${this.API_URI}/listarAnimalesAdoptados`);
  }

  listarAnimalesSinAdoptar() {
    return this.http.get(`${this.API_URI}/listarAnimalesSinAdoptar`);
  }

  fechaAdoptados() {
    return this.http.get(`${this.API_URI}/fechaAdoptados`);
  }

  listarAnimalesFiltrado(filtro: any) {
    console.log({ message: 'filtro: ', filtro });
    return this.http.post(`${this.API_URI}/listAnimalsFiltrado`, filtro);
  }

  listarAnimalesDelUsuario(id: string) {
    return this.http.get(`${this.API_URI}/listAnimalsUser/${id}`);
  }

  listarAnimalesDelUsuarioAdoptados(id: string) {
    return this.http.get(`${this.API_URI}/listAnimalsUserAdoptados/${id}`);
  }

  listarAnimalesDelUsuarioEnAdopcion(id: string) {
    return this.http.get(`${this.API_URI}/listAnimalsUserEnAdopcion/${id}`);
  }

  buscarUsuario(id: string) {
    return this.http.get(`${this.API_URI}/find/${id}`);
  }

  buscarAnimal(id: string) {
    return this.http.get(`${this.API_URI}/findAnimal/${id}`);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/create`, usuario);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }

  actualizarUsuario(
    id: string,
    actualizaUsuario: Usuario
  ): Observable<Usuario> {
    return this.http.put(`${this.API_URI}/update/${id}`, actualizaUsuario);
  }

  ingresar(usuario: any) {
    return this.http.post(`${this.API_URI}/signin`, usuario);
  }

  registrar(usuario: any) {
    this.user = usuario;
    return this.http.post(`${this.API_URI}/signup`, usuario);
  }

  verificar(token: any) {
    return this.http.get(`${this.API_URI}/confirmar/${token}`);
  }

  recoverPassword(email: any) {
    console.log('email => ', email);
    let emailToSend = '{ "email": "' + email + '" }';
    let emailJsoned = JSON.parse(emailToSend);
    return this.http.post(`${this.API_URI}/password-recovery`, emailJsoned);
  }

  newPassword(token: any, password: any) {
    console.log('token => ', token);
    console.log('password => ', password);
    let passToSend = '{ "newPassword": "' + password + '" }';
    let passJsoned = JSON.parse(passToSend);
    return this.http.post(`${this.API_URI}/new-password/${token}`, passJsoned, {
      headers: { reset: token },
    });
  }

  registrarAnimal(animal: any, id: string) {
    animal.idDador = id;
    console.log(animal.idDador);
    return this.http.post(`${this.API_URI}/signupAnimal`, animal);
  }

  comenzarAdopcion(idAnimal: string, idUsuario: string) {
    const adopcionData = { id_animal: idAnimal, id_usuario: idUsuario };
    return this.http.post(`${this.API_URI}/comenzarAdopcion`, adopcionData);
  }

  confirmarAdopcion(idAnimal: string, idUsuario: object) {
    return this.http.post(
      `${this.API_URI}/confirmarAdopcion/${idAnimal}`,
      idUsuario
    );
  }

  cancelarProcesoAdopcion(idAnimal: string) {
    return this.http.delete(
      `${this.API_URI}/cancelarProcesoAdopcion/${idAnimal}`
    );
  }

  estadoAnimal(idAnimal: string) {
    return this.http.get(`${this.API_URI}/estadoAnimal/${idAnimal}`);
  }

  mostrarInteres(idAnimal: string, idInteresado: object) {
    return this.http.post(
      `${this.API_URI}/mostrarInteres/${idAnimal}`,
      idInteresado
    );
  }

  quitarInteres(idAnimal: string, idInteresado: object) {
    return this.http.post(
      `${this.API_URI}/quitarInteres/${idAnimal}`,
      idInteresado
    );
  }

  cargarInteres(idAnimal: string, idUsuario: object) {
    return this.http.post(
      `${this.API_URI}/cargarInteres/${idAnimal}`,
      idUsuario
    );
  }

  cargarInteresados(idAnimal: string) {
    console.log('cargarInteresados ');
    return this.http.get(`${this.API_URI}/cargarInteresados/${idAnimal}`);
  }

  listarAnimalesConInteres() {
    return this.http.get(`${this.API_URI}/listarAnimalesConInteres`);
  }

  siguiendoAnimales(idUsuario: string) {
    console.log('cargar animales siguiendo');
    return this.http.get(`${this.API_URI}/siguiendoAnimales/${idUsuario}`);
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
  }

  logOut() {
    this.user = { id: '' };
    localStorage.removeItem('token');
    this.router.navigate(['usuarios/buscador-avanzado']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodificarToken(token: any) {
    console.log({ message: 'tokenAngular ' + token });

    return this.http.post(`${this.API_URI}/dToken`, token);
  }

  eliminarComentario(id: string) {
    return this.http.delete(`${this.API_URI}/deleteComentario/${id}`);
  }

  editarPerfil(actualizarUsuario: Usuario, id: string): Observable<Usuario> {
    return this.http.put(
      `${this.API_URI}/updateDataUsuario/${id}`,
      actualizarUsuario
    );
  }

  traerVacunasAnimal(id: string) {
    return this.http.get(`${this.API_URI}/traerVacunasAnimal/${id}`);
  }

  modificarVacunasAnimal(vacunas: any, id: string) {
    return this.http.put(
      `${this.API_URI}/modificarVacunasAnimal/${id}`,
      vacunas
    );
  }

  modificarDatosAnimal(animal: Animal, id: string): Observable<Usuario> {
    console.log('id', id);
    return this.http.put(`${this.API_URI}/modificarDatosAnimal/${id}`, animal);
  }

  cantidadUsuariosRegistrados() {
    return this.http.get(`${this.API_URI}/cantidadUsuariosRegistrados`);
  }

  cantidadAnimalesRegistrados() {
    return this.http.get(`${this.API_URI}/cantidadAnimalesRegistrados`);
  }

  cantidadAnimalesAdoptados() {
    return this.http.get(`${this.API_URI}/cantidadAnimalesAdoptados`);
  }

  cantidadAnimalesEnAdopcion() {
    return this.http.get(`${this.API_URI}/cantidadAnimalesEnAdopcion`);
  }

  promedioAnimalesAdoptados() {
    return this.http.get(`${this.API_URI}/promedioAnimalesAdoptados`);
  }
}
