import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                
                // Responsive particle properties
                const isMobile = canvas.width < 768;
                const speedMultiplier = isMobile ? 0.3 : 0.5;
                const sizeMultiplier = isMobile ? 0.8 : 1;
                
                this.vx = (Math.random() - 0.5) * speedMultiplier;
                this.vy = (Math.random() - 0.5) * speedMultiplier;
                this.radius = (Math.random() * 2 + 1) * sizeMultiplier;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Responsive mouse interaction
                const isMobile = canvas.width < 768;
                const interactionRadius = isMobile ? 60 : 100;
                const forceMultiplier = isMobile ? 0.0005 : 0.001;
                
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < interactionRadius) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    this.vx += dx * force * forceMultiplier;
                    this.vy += dy * force * forceMultiplier;
                }

                // Limit velocity
                this.vx = Math.max(-2, Math.min(2, this.vx));
                this.vy = Math.max(-2, Math.min(2, this.vy));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 124, 237, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Initialize particles with responsive count
        const initParticles = () => {
            particlesRef.current = [];
            
            // Responsive particle count based on screen size
            let particleCount;
            if (canvas.width < 768) {
                // Mobile: fewer particles for better performance
                particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 15000));
            } else if (canvas.width < 1024) {
                // Tablet: medium particle count
                particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 12000));
            } else {
                // Desktop: full particle count
                particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
            }
            
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push(new Particle());
            }
        };

        initParticles();

        // Draw connections between nearby particles
        const drawConnections = () => {
            // Responsive connection distance
            const isMobile = canvas.width < 768;
            const connectionDistance = isMobile ? 80 : 120;
            const maxOpacity = isMobile ? 0.15 : 0.2;
            
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (connectionDistance - distance) / connectionDistance * maxOpacity;
                        ctx.beginPath();
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.strokeStyle = `rgba(0, 124, 237, ${opacity})`;
                        ctx.lineWidth = isMobile ? 0.5 : 1;
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            drawConnections();

            animationRef.current = requestAnimationFrame(animate);
        };

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        // Touch move handler for mobile
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouseRef.current.x = e.touches[0].clientX;
                mouseRef.current.y = e.touches[0].clientY;
            }
        };

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        // Start animation
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, #222 0%, #1a1a1a 100%)'
            }}
        />
    );
};

export default InteractiveBackground;