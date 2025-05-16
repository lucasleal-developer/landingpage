document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const navMenu = document.querySelector('nav ul');
    
    if (menuMobile) {
        menuMobile.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Abre/fecha o item atual
            item.classList.toggle('active');
        });
    });
    
    // Slider de Depoimentos
    const slider = document.querySelector('.depoimentos-slider');
    const slides = document.querySelectorAll('.depoimento-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const slideWidth = slides.length > 0 ? slides[0].clientWidth + 30 : 0; // +30 para o gap
    
    // Função para atualizar o slider
    function updateSlider() {
        if (slider && slides.length > 0) {
            slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            
            // Atualiza os dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    // Event listeners para os botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });
    }
    
    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto slide a cada 5 segundos
    setInterval(() => {
        if (window.innerWidth > 768) { // Só faz auto slide em telas maiores
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }
    }, 5000);
    
    // Formulário de Inscrição
    const form = document.getElementById('inscricao-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulação de envio
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Simula um tempo de processamento
                setTimeout(() => {
                    // Exibe mensagem de sucesso
                    form.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Inscrição Recebida com Sucesso!</h3>
                            <p>Entraremos em contato em breve para confirmar sua vaga e agendar a aula experimental.</p>
                        </div>
                    `;
                    
                    // Scroll para a mensagem
                    form.scrollIntoView({ behavior: 'smooth' });
                }, 2000);
            }
        });
    }
    
    // Animação de scroll suave para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuMobile.classList.remove('active');
                }
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // -80 para compensar o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de elementos ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .metodologia-item, .depoimento-card, .plano-card, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Adiciona classe para animação CSS
    document.querySelectorAll('.card, .metodologia-item, .depoimento-card, .plano-card, .info-card').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Executa a animação no carregamento e no scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez no carregamento
    
    // Atualiza o slider no carregamento
    updateSlider();
    
    // Adiciona estilo para o menu ativo baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Executa uma vez no carregamento
});
