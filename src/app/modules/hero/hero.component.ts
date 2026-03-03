import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('bgVideoElement') bgVideoElement!: ElementRef<HTMLVideoElement>;
  isPlayButton: boolean = false;  // Initially show the play button
  isPauseButton: boolean = true;

  togglePlayButton(): void {
    if (this.videoElement.nativeElement.paused) {
      this.videoElement.nativeElement.play();
      this.bgVideoElement.nativeElement.play();
      this.isPlayButton = false;  // Hide play button
      this.isPauseButton = true;  // Show pause button
    }
  }

  togglePauseButton(): void {
    if (!this.videoElement.nativeElement.paused) {
      this.videoElement.nativeElement.pause();
      this.bgVideoElement.nativeElement.pause();
      this.isPlayButton = true;   // Show play button
      this.isPauseButton = false; // Hide pause button
    }
  }
  ngAfterViewInit(): void {
    const main = this.videoElement.nativeElement;
    const bg = this.bgVideoElement.nativeElement;

    main.muted = true;
    bg.muted = true;

    main.load();
    bg.load();

    this.playVideos();
  }
  playVideos() {
    const main = this.videoElement.nativeElement;
    const bg = this.bgVideoElement.nativeElement;

    Promise.all([
      main.play(),
      bg.play()
    ]).catch(() => { });
  }

  pauseVideos() {
    const main = this.videoElement.nativeElement;
    const bg = this.bgVideoElement.nativeElement;

    main.pause();
    bg.pause();
  }
  startVideos() {
    const mainVideo = this.videoElement.nativeElement;
    const bgVideo = this.bgVideoElement.nativeElement;

    mainVideo.muted = true;
    bgVideo.muted = true;

    mainVideo.load();
    bgVideo.load();

    mainVideo.play().catch(() => { });
    bgVideo.play().catch(() => { });
  }
}
