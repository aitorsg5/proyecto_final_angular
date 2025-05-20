import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';


@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {

  users: Usuario[] = [];
  videoSources: string[] = [
    'assets/video/AudiRs5.mp4',
    'assets/video/Audi_R8.mp4',
    'assets/video/AudiRs6.mp4',
    'assets/video/Audi_r8_Register.mp4'
  ];
  currentVideoIndex = 0;
  carImages: string[] = [
    'assets/fotos/audirs6_1.jpg',
    'assets/fotos/audirs6_2.jpg',
    'assets/fotos/audirs6_4.jpg',
    'assets/fotos/audirs6_5.jpg',
    'assets/fotos/audirs6_6.jpg',
    'assets/fotos/audirs6_7.jpg'
  ];
  currentIndex = 0;

  constructor(private userService: UsuarioService) {}

  ngOnInit(): void {
  this.userService.cargarSesion();

  this.userService.getCurrentUser().subscribe(usuario => {
    if (!usuario) {
      this.activarModoInvitado();
    }
  });
}

activarModoInvitado(): void {
  console.log("Modo invitado activado. Limitando funcionalidades...");
  // Aquí puedes ocultar opciones de usuario, modificar la UI, etc.
}

  ngAfterViewInit(): void {
    this.userService.getUsuarios().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });

    this.setupVideo();
  }

  setupVideo(): void {
    const video: HTMLVideoElement = document.getElementById('myVideo1') as HTMLVideoElement;

    if (video) {
      video.muted = true;
      video.autoplay = true;
      video.src = this.videoSources[this.currentVideoIndex];
      video.load();
      video.play().catch(err => console.error('Error playing video:', err));

      video.onended = () => {
        this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoSources.length;
        video.src = this.videoSources[this.currentVideoIndex];
        video.load();
        video.play().catch(err => console.error('Error playing next video:', err));
      };

      video.addEventListener('click', () => {
        video.muted = !video.muted;
        video.play().catch(err => console.error('Error toggling mute state:', err));
      });
    }
  }

  nextSlide(): void {
    const slider = document.getElementById('slider') as HTMLElement;
    const container = document.querySelector('.slider-container') as HTMLElement;
    const slideWidth = container.offsetWidth;
    const totalSlides = this.carImages.length;
    this.currentIndex = (this.currentIndex + 1) % totalSlides;
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }

  prevSlide(): void {
    const slider = document.getElementById('slider') as HTMLElement;
    const container = document.querySelector('.slider-container') as HTMLElement;
    const slideWidth = container.offsetWidth;
    const totalSlides = this.carImages.length;
    this.currentIndex = (this.currentIndex - 1 + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }
}
