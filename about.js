        // Geometric Background Animation
        const canvas = document.getElementById('geometric-bg');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        function updateCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Particle configuration
        const particles = [];
        const colors = [
            'hsl(180, 85%, 45%)', // lighter cyan
            'hsl(217, 85%, 50%)', // lighter blue
            'hsl(271, 75%, 55%)', // lighter purple
            'hsl(330, 75%, 65%)', // lighter pink
        ];
        const shapes = ['triangle', 'square', 'hexagon'];

        // Create particles
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 20 + 10,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
            });
        }

        // Draw shape functions
        function drawTriangle(x, y, size, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size * 0.866, size * 0.5);
            ctx.lineTo(-size * 0.866, size * 0.5);
            ctx.closePath();
            ctx.restore();
        }

        function drawSquare(x, y, size, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.rect(-size, -size, size * 2, size * 2);
            ctx.restore();
        }

        function drawHexagon(x, y, size, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const hexAngle = (Math.PI / 3) * i;
                const hx = size * Math.cos(hexAngle);
                const hy = size * Math.sin(hexAngle);
                if (i === 0) {
                    ctx.moveTo(hx, hy);
                } else {
                    ctx.lineTo(hx, hy);
                }
            }
            ctx.closePath();
            ctx.restore();
        }

        // Animation loop
        function animate() {
            ctx.fillStyle = 'rgba(250, 250, 250, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.angle += particle.rotationSpeed;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle with glow
                ctx.strokeStyle = particle.color;
                ctx.lineWidth = 2;
                ctx.shadowBlur = 20;
                ctx.shadowColor = particle.color;
                
                // Draw based on shape
                switch (particle.shape) {
                    case 'triangle':
                        drawTriangle(particle.x, particle.y, particle.size, particle.angle);
                        break;
                    case 'square':
                        drawSquare(particle.x, particle.y, particle.size, particle.angle);
                        break;
                    case 'hexagon':
                        drawHexagon(particle.x, particle.y, particle.size, particle.angle);
                        break;
                }
                
                ctx.stroke();
                
                // Draw connections
                particles.forEach((otherParticle) => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );
                    
                    if (distance < 150 && distance > 0) {
                        ctx.strokeStyle = `rgba(100, 200, 255, ${0.15 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.shadowBlur = 0;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        // Card and text animations
        window.addEventListener('load', () => {
            // Fade in card
            setTimeout(() => {
                const card = document.getElementById('main-card');
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                
                // Start typewriter effect
                setTimeout(() => {
                    const bioText = document.getElementById('bio-text');
                    const typewriter = document.getElementById('typewriter');
                    const cursor = document.getElementById('cursor');
                    
                    bioText.style.opacity = '1';
                    typewriter.classList.add('animate-typewriter');
                    cursor.style.opacity = '1';
                    cursor.classList.add('animate-blink');
                }, 500);
            }, 100);
        });