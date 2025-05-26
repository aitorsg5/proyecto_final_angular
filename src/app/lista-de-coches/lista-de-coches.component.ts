import { Component, OnInit, AfterViewInit } from '@angular/core'; // Added AfterViewInit
import { CocheService } from '../services/coche.service'; // Assuming this path is correct
import { Coche } from '../models/coche'; // Assuming this path is correct and Coche model exists
import { Router } from '@angular/router'; // For navigation

@Component({
  selector: 'app-lista-de-coches',
  templateUrl: './lista-de-coches.component.html',
  styleUrls: ['./lista-de-coches.component.scss']
})
export class ListaDeCochesComponent implements OnInit, AfterViewInit { // Implemented AfterViewInit
  // Array to hold all cars fetched from the service
  coches: Coche[] = [];
  // Base URL for car images, typically from a service or environment variable
  baseImageUrl: string;

  // Array to hold cars filtered based on user selections, displayed in the template
  cochesFiltrados: Coche[] = [];
  // Array to store unique car model names for filter buttons
  modelosUnicos: string[] = [];
  // Array to store unique car types for filter buttons (assuming 'tipo' property in Coche)
  // NOTE: User indicated 'coche.tipo' might not exist. This functionality is commented out for now.
  // tiposUnicos: string[] = [];

  // Tracks the currently active model filter, 'Todos' by default
  currentModelFilter: string = 'Todos';
  // Tracks the currently active type filter, 'Todos' by default
  // NOTE: User indicated 'coche.tipo' might not exist. This is commented out for now.
  // currentTypeFilter: string = 'Todos';

  // Properties for the video background
  videoSources: string[] = [
    'assets/video/AudiRs5.mp4',
    'assets/video/Audi_R8.mp4',
    'assets/video/AudiRs6.mp4',
    'assets/video/Audi_r8_Register.mp4'
  ];
  currentVideoIndex = 0;

  // Properties for the car image slider/carousel
  carImages: string[] = [
    'assets/fotos/audirs6_1.jpg',
    'assets/fotos/audirs6_2.jpg',
    'assets/fotos/audirs6_4.jpg',
    'assets/fotos/audirs6_5.jpg',
    'assets/fotos/audirs6_6.jpg',
    'assets/fotos/audirs6_7.jpg'
  ];
  currentIndex = 0; // Current index for the image slider

  constructor(
    private cocheService: CocheService, // Inject CocheService to fetch car data
    private router: Router // Inject Router for navigation
    // Removed UsuarioService and AuthService as they were not used in the previous ListaDeCochesComponent
  ) {
    // Initialize baseImageUrl from the CocheService
    this.baseImageUrl = this.cocheService.baseImageUrl;
  }

  ngOnInit(): void {
    // Fetch car data when the component initializes
    this.cocheService.getCoches().subscribe(data => {
      this.coches = data; // Store all fetched cars
      this.applyFilters(); // Apply initial filters (show all cars initially)

      // Extract unique model names from the fetched cars
      const modelos = data
        .map(coche => coche.modelo?.nombre) // Map to model names
        .filter((nombre): nombre is string => nombre !== undefined && nombre !== null); // Filter out null/undefined
      this.modelosUnicos = Array.from(new Set(modelos)); // Get unique values

      // Extract unique vehicle types from the fetched cars
      // NOTE: User indicated 'coche.tipo' might not exist. This functionality is commented out for now.
      /*
      const tipos = data
        .map(coche => coche.tipo?.nombre) // Assuming 'tipo' property with 'nombre' for type
        .filter((nombre): nombre is string => nombre !== undefined && nombre !== null); // Filter out null/undefined
      this.tiposUnicos = Array.from(new Set(tipos)); // Get unique values
      */
    });
  }

  ngAfterViewInit(): void {
    // Setup video background after the view has been initialized
    this.setupVideo();
  }

  /**
   * Applies all active filters (model and type) to the 'coches' array
   * and updates 'cochesFiltrados'. This function is called whenever a filter changes.
   */
  applyFilters(): void {
    let tempCoches = this.coches; // Start with the full list of cars

    // Filter by model if a specific model is selected
    if (this.currentModelFilter !== 'Todos') {
      tempCoches = tempCoches.filter(coche => coche.modelo?.nombre === this.currentModelFilter);
    }

    // Filter by type if a specific type is selected
    // NOTE: User indicated 'coche.tipo' might not exist. This filtering is commented out for now.
    /*
    if (this.currentTypeFilter !== 'Todos') {
      tempCoches = tempCoches.filter(coche => coche.tipo?.nombre === this.currentTypeFilter);
    }
    */

    this.cochesFiltrados = tempCoches; // Update the displayed list of cars
  }

  /**
   * Sets the active model filter and re-applies all filters.
   * @param modelo The model name to filter by, or 'Todos' to show all models.
   */
  filtrarPorModelo(modelo: string): void {
    this.currentModelFilter = modelo; // Update the current model filter
    this.applyFilters(); // Re-apply all filters to update the displayed cars
  }

  /**
   * Sets the active vehicle type filter and re-applies all filters.
   * @param tipo The type name to filter by, or 'Todos' to show all types.
   * NOTE: User indicated 'coche.tipo' might not exist. This function is commented out for now.
   */
  /*
  filtrarPorTipo(tipo: string): void {
    this.currentTypeFilter = tipo; // Update the current type filter
    this.applyFilters(); // Re-apply all filters to update the displayed cars
  }
  */

  /**
   * Navigates to the car configuration page for a specific car.
   * @param id The ID of the car to configure.
   */
  irConfiguracion(id?: number): void {
    if (id == null) {
      console.error('El ID del coche es inválido'); // Log an error if ID is missing
      return;
    }
    this.router.navigate(['/configuracion', id]); // Navigate to the configuration route with the car ID
  }

  /**
   * Sets up and manages the video background playback.
   * Cycles through video sources and handles mute/unmute on click.
   */
  setupVideo(): void {
    const video: HTMLVideoElement = document.getElementById('myVideo1') as HTMLVideoElement;

    if (video) {
      video.muted = true; // Start muted
      video.autoplay = true; // Autoplay
      video.src = this.videoSources[this.currentVideoIndex]; // Set initial video source
      video.load(); // Load the video
      video.play().catch(err => console.error('Error playing video:', err)); // Play, catch potential errors

      // When video ends, play the next one in the sequence
      video.onended = () => {
        this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoSources.length;
        video.src = this.videoSources[this.currentVideoIndex];
        video.load();
        video.play().catch(err => console.error('Error playing next video:', err));
      };

      // Toggle mute state on video click
      video.addEventListener('click', () => {
        video.muted = !video.muted;
        video.play().catch(err => console.error('Error toggling mute state:', err));
      });
    }
  }

  /**
   * Advances the image slider to the next slide.
   * Updates the currentIndex and applies a transform to the slider element.
   */
  nextSlide(): void {
    const slider = document.getElementById('slider') as HTMLElement;
    const container = document.querySelector('.slider-container') as HTMLElement;
    if (!slider || !container) {
      console.warn('Slider or container element not found for nextSlide.');
      return;
    }

    const slideWidth = container.offsetWidth; // Get the width of the container for slide movement
    const totalSlides = this.carImages.length;
    this.currentIndex = (this.currentIndex + 1) % totalSlides; // Cycle to the next index
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`; // Apply transform
  }

  /**
   * Moves the image slider to the previous slide.
   * Updates the currentIndex and applies a transform to the slider element.
   */
  prevSlide(): void {
    const slider = document.getElementById('slider') as HTMLElement;
    const container = document.querySelector('.slider-container') as HTMLElement;
    if (!slider || !container) {
      console.warn('Slider or container element not found for prevSlide.');
      return;
    }

    const slideWidth = container.offsetWidth; // Get the width of the container for slide movement
    const totalSlides = this.carImages.length;
    // Calculate previous index, ensuring it wraps around correctly for negative results
    this.currentIndex = (this.currentIndex - 1 + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`; // Apply transform
  }
}
