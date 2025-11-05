import React, { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [userGuess, setUserGuess] = useState(null);

  // Game images data - randomized order to avoid patterns (10 rounds)
  const gameImages = [
    { id: 1, src: '/images/ai1.jpg', isAI: true, description: 'AI Generated Image' },
    { id: 2, src: '/images/real1.jpg', isAI: false, description: 'Real Photo: Beautiful Bird' },
    { id: 3, src: '/images/real2.jpg', isAI: false, description: 'Real Photo: Pink Sand Beach' },
    { id: 4, src: '/images/ai2.jpg', isAI: true, description: 'AI Generated Image' },
    { id: 5, src: '/images/ai3.jpg', isAI: true, description: 'AI Generated Image' },
    { id: 6, src: '/images/real3.jpg', isAI: false, description: 'Real Photo: Soccer Match Action' },
    { id: 7, src: '/images/ai4.jpg', isAI: true, description: 'AI Generated Image' },
    { id: 8, src: '/images/real4.jpg', isAI: false, description: 'Real Photo' },
    { id: 9, src: '/images/ai5.jpg', isAI: true, description: 'AI Generated Image' },
    { id: 10, src: '/images/real5.jpg', isAI: false, description: 'Real Photo' }
  ];

  const handleStartGame = () => {
    setCurrentView('game');
    setCurrentImageIndex(0);
    setScore({ correct: 0, total: 0 });
    setShowFeedback(false);
    setUserGuess(null);
  };

  const handleGuess = (isAIGuess: boolean) => {
    const currentImage = gameImages[currentImageIndex];
    const isCorrect = isAIGuess === currentImage.isAI;
    
    setUserGuess(isAIGuess);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setShowFeedback(true);
  };

  const handleNextImage = () => {
    if (currentImageIndex < gameImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setShowFeedback(false);
      setUserGuess(null);
    } else {
      setCurrentView('results');
    }
  };

  const renderHomepage = () => (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#4F46E5', 
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', textAlign: 'center', marginBottom: '30px' }}>
        Can You Tell What's <span style={{ color: '#FFD700' }}>Real</span>?
      </h1>
      
      <p style={{ fontSize: '20px', textAlign: 'center', marginBottom: '40px' }}>
        Test your ability to distinguish between AI-generated images and real photographs.
      </p>
      
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={handleStartGame}
          style={{ 
            backgroundColor: '#10B981', 
            color: 'white', 
            padding: '15px 30px', 
            fontSize: '18px', 
            border: 'none', 
            borderRadius: '8px',
            margin: '10px',
            cursor: 'pointer'
          }}
        >
          Play Game
        </button>
        
        <button 
          onClick={() => setCurrentView('info')}
          style={{ 
            backgroundColor: 'white', 
            color: '#4F46E5', 
            padding: '15px 30px', 
            fontSize: '18px', 
            border: '2px solid white', 
            borderRadius: '8px',
            margin: '10px',
            cursor: 'pointer'
          }}
        >
          Learn More
        </button>
      </div>
      
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px', 
          maxWidth: '600px', 
          margin: '60px auto',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>10</div>
            <div>Images to Guess</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>50%</div>
            <div>Average Success Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>4min</div>
            <div>Challenge</div>
          </div>
        </div>
    </div>
  );

  const renderGamePage = () => {
    const currentImage = gameImages[currentImageIndex];
    const progressPercentage = ((currentImageIndex + 1) / gameImages.length) * 100;

  return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#F3F4F6', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button 
            onClick={() => setCurrentView('home')}
            style={{ 
              backgroundColor: '#4F46E5', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ← Back to Home
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}>
              {currentImageIndex + 1} of {gameImages.length}
            </div>
            <div style={{ color: '#6B7280' }}>Score: {score.correct}/{score.total}</div>
          </div>
          
          <div style={{ width: '140px' }}></div> {/* Spacer */}
        </div>

        {/* Progress bar */}
        <div style={{ 
          width: '100%', 
          height: '8px', 
          backgroundColor: '#E5E7EB', 
          borderRadius: '4px', 
          marginBottom: '30px' 
        }}>
          <div style={{ 
            width: `${progressPercentage}%`, 
            height: '100%', 
            backgroundColor: '#4F46E5', 
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>

        {/* Game content */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '12px', 
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {/* Image */}
          <img 
            src={currentImage.src} 
            alt={`Image ${currentImageIndex + 1}`}
            style={{ 
              maxWidth: '100%', 
              height: 'auto', 
              marginBottom: '30px',
              maxHeight: '400px',
              objectFit: 'contain'
            }}
          />

          {!showFeedback ? (
            // Game buttons
            <div>
              <h3 style={{ fontSize: '20px', color: '#1F2937', marginBottom: '30px' }}>
                Is this image AI-generated or real?
              </h3>
              
              <div>
                <button 
                  onClick={() => handleGuess(true)}
                  style={{ 
                    backgroundColor: '#EF4444', 
                    color: 'white', 
                    padding: '15px 30px', 
                    fontSize: '18px', 
                    border: 'none', 
                    borderRadius: '8px',
                    margin: '0 15px',
                    cursor: 'pointer'
                  }}
                >
                  AI Generated
                </button>
                
                <button 
                  onClick={() => handleGuess(false)}
                  style={{ 
                    backgroundColor: '#10B981', 
                    color: 'white', 
                    padding: '15px 30px', 
                    fontSize: '18px', 
                    border: 'none', 
                    borderRadius: '8px',
                    margin: '0 15px',
                    cursor: 'pointer'
                  }}
                >
                  Real Photo
                </button>
              </div>
            </div>
          ) : (
            // Feedback
      <div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                marginBottom: '20px',
                color: userGuess === currentImage.isAI ? '#10B981' : '#EF4444'
              }}>
                {userGuess === currentImage.isAI ? '✅ Correct!' : '❌ Incorrect!'}
              </div>
              
              <p style={{ fontSize: '18px', color: '#1F2937', marginBottom: '30px' }}>
                This image was {currentImage.isAI ? 'AI-generated' : 'a real photograph'}.
              </p>
              
              <button
                onClick={handleNextImage}
                style={{ 
                  backgroundColor: '#4F46E5', 
                  color: 'white', 
                  padding: '15px 30px', 
                  fontSize: '18px', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {currentImageIndex < gameImages.length - 1 ? 'Next Image' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInfoPage = () => (
    <div style={{ 
      backgroundColor: '#F9FAFB', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#1F2937', 
        color: 'white', 
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <button 
          onClick={() => setCurrentView('home')}
          style={{ 
            backgroundColor: '#4F46E5', 
            color: 'white', 
            padding: '12px 24px', 
            border: 'none', 
            borderRadius: '8px',
            position: 'absolute',
            top: '30px',
            left: '40px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ← Back to Home
        </button>
        
        <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '24px', lineHeight: '1.1' }}>
          Why It's Getting Harder to Tell
        </h1>
        
        <p style={{ fontSize: '24px', opacity: 0.9, maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
          The rise of AI image generation has fundamentally changed how we perceive and trust visual media. 
          Here's everything you need to know about this technological revolution.
        </p>
      </div>

      <div style={{ padding: '80px 40px' }}>
        {/* Section 1: The AI Revolution */}
        <section style={{ maxWidth: '1200px', margin: '0 auto 100px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: '60px' }}>
            🚀 The AI Image Revolution
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '32px', color: '#4F46E5', marginBottom: '24px' }}>From Pixels to Perfection</h3>
              <p style={{ fontSize: '18px', color: '#6B7280', lineHeight: '1.7', marginBottom: '24px' }}>
                In just a few years, AI has evolved from creating blurry, obviously fake images to producing 
                photorealistic masterpieces that can fool even experts. This transformation happened faster 
                than anyone predicted.
              </p>
              <div style={{ 
                backgroundColor: '#EEF2FF', 
                padding: '24px', 
                borderRadius: '12px', 
                borderLeft: '4px solid #4F46E5' 
              }}>
                <p style={{ fontSize: '16px', color: '#4F46E5', fontWeight: 'bold', margin: 0 }}>
                  💡 Fun Fact: The first AI-generated artwork sold at auction for $432,500 in 2018. 
                  Today, AI can create similar quality images in seconds.
                </p>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '24px', 
                color: '#1F2937', 
                marginBottom: '30px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                The Evolution Timeline
              </h3>
              
              {/* Timeline */}
              <div style={{ position: 'relative', paddingLeft: '30px' }}>
                {/* Timeline line */}
                <div style={{
                  position: 'absolute',
                  left: '15px',
                  top: '0',
                  bottom: '0',
                  width: '3px',
                  background: 'linear-gradient(to bottom, #4F46E5, #7C3AED, #EC4899)',
                  borderRadius: '2px'
                }}></div>
                
                {[
                  { year: '2018', title: 'The Beginning', desc: 'GANs create first recognizable (but flawed) faces', color: '#EF4444' },
                  { year: '2020', title: 'GPT-3 Era', desc: 'DALL-E 1 shows text-to-image is possible', color: '#F59E0B' },
                  { year: '2022', title: 'The Breakthrough', desc: 'DALL-E 2, Midjourney & Stable Diffusion launch', color: '#10B981' },
                  { year: '2023', title: 'Mass Adoption', desc: '15+ billion images created, tools go mainstream', color: '#3B82F6' },
                  { year: '2024', title: 'Photorealism', desc: 'Nearly impossible to distinguish from real photos', color: '#8B5CF6' }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    position: 'relative', 
                    marginBottom: index === 4 ? '0' : '24px',
                    paddingLeft: '40px'
                  }}>
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-23px',
                      top: '8px',
                      width: '16px',
                      height: '16px',
                      backgroundColor: item.color,
                      borderRadius: '50%',
                      border: '3px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}></div>
                    
                    {/* Timeline content */}
                    <div style={{
                      backgroundColor: '#F9FAFB',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      borderLeft: `4px solid ${item.color}`
                    }}>
                      <div style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        color: item.color,
                        marginBottom: '4px'
                      }}>
                        {item.year} - {item.title}
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#6B7280',
                        lineHeight: '1.4'
                      }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                textAlign: 'center', 
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#F3F4F6',
                borderRadius: '12px'
              }}>
                <p style={{ 
                  color: '#4F46E5', 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  From laughably fake to indistinguishable in just 6 years!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Leading AI Models */}
        <section style={{ maxWidth: '1200px', margin: '0 auto 100px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: '60px' }}>
            The Big Players
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '60px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '16px', 
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="/images/midjourney.jpg" 
                alt="Midjourney Logo"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '20px',
                  margin: '0 auto 24px',
                  objectFit: 'cover'
                }}
              />
              <h3 style={{ fontSize: '24px', color: '#1F2937', marginBottom: '16px' }}>Midjourney</h3>
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                The artist's favorite. Known for dreamy, artistic images with incredible detail and creative interpretation.
              </p>
              <div style={{ backgroundColor: '#F3F0FF', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#8B5CF6' }}>Best for:</strong> Creative, artistic imagery
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '16px', 
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="/images/dalle.jpg" 
                alt="DALL-E Logo"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '20px',
                  margin: '0 auto 24px',
                  objectFit: 'cover'
                }}
              />
              <h3 style={{ fontSize: '24px', color: '#1F2937', marginBottom: '16px' }}>DALL·E 3</h3>
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                OpenAI's powerhouse. Excels at understanding complex prompts and generating photorealistic images.
              </p>
              <div style={{ backgroundColor: '#ECFDF5', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#10B981' }}>Best for:</strong> Realistic, prompt-accurate images
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '16px', 
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="/images/stableai.jpg" 
                alt="Stable Diffusion Logo"
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '20px',
                  margin: '0 auto 24px',
                  objectFit: 'cover'
                }}
              />
              <h3 style={{ fontSize: '24px', color: '#1F2937', marginBottom: '16px' }}>Stable Diffusion</h3>
              <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                The open-source champion. Democratized AI image generation and spawned countless variations.
              </p>
              <div style={{ backgroundColor: '#EFF6FF', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#3B82F6' }}>Best for:</strong> Customization and accessibility
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Mind-Blowing Statistics */}
        <section style={{ maxWidth: '1200px', margin: '0 auto 100px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: '60px' }}>
            The Numbers Don't Lie
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginBottom: '60px' }}>
            {[
              { number: '58%', label: 'Human Detection Rate', sublabel: 'Average accuracy spotting AI images', color: '#EF4444' },
              { number: '92%', label: 'AI Tool Accuracy', sublabel: 'Success rate of detection software', color: '#10B981' },
              { number: '1000x', label: 'Speed Increase', sublabel: 'Generation speed since 2020', color: '#8B5CF6' },
              { number: '2024', label: 'Breakthrough Year', sublabel: 'When AI became indistinguishable', color: '#F59E0B' }
            ].map((stat, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white', 
                padding: '30px', 
                borderRadius: '16px', 
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: stat.color, 
                  marginBottom: '8px' 
                }}>{stat.number}</div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#1F2937', 
                  marginBottom: '8px' 
                }}>{stat.label}</div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#6B7280' 
                }}>{stat.sublabel}</div>
              </div>
            ))}
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              fontSize: '28px', 
              color: '#1F2937', 
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              The Scale is Mind-Blowing
            </h3>
            <img 
              src="/images/ai-usage-infographic.jpg" 
              alt="AI Image Generation Statistics - 15.47 billion images created as of August 2023"
              style={{ 
                maxWidth: '100%', 
                height: 'auto', 
                borderRadius: '12px',
                marginBottom: '20px'
              }}
            />
            <p style={{ 
              color: '#6B7280', 
              fontSize: '16px',
              fontStyle: 'italic'
            }}>
              Over 15.47 billion AI images created by August 2023 - and that number is growing exponentially every day.
            </p>
          </div>
        </section>

        {/* Section 4: How to Spot AI Images */}
        <section style={{ maxWidth: '1200px', margin: '0 auto 100px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: '60px' }}>
            🔍 Detective Mode: Spotting AI Images
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
            <div>
              <h3 style={{ fontSize: '28px', color: '#EF4444', marginBottom: '32px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '12px' }}>🚨</span>
                Red Flags to Watch For
              </h3>
              
              {[
                { icon: '👁️', title: 'Weird Eyes', desc: 'Unnatural pupils, mismatched iris patterns, or asymmetrical eyes' },
                { icon: '✋', title: 'Hand Horrors', desc: 'Extra fingers, missing thumbs, or impossible hand positions' },
                { icon: '✨', title: 'Perfect Imperfections', desc: 'Skin that\'s too perfect or hair with impossible physics' },
                { icon: '📝', title: 'Text Troubles', desc: 'Gibberish text, backwards letters, or morphing words' },
                { icon: '🌅', title: 'Background Bizarreness', desc: 'Objects that don\'t make sense or impossible perspectives' }
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: '#FEF2F2',
                  borderRadius: '12px'
                }}>
                  <span style={{ fontSize: '24px', marginRight: '16px' }}>{item.icon}</span>
                  <div>
                    <strong style={{ color: '#DC2626', display: 'block', marginBottom: '4px' }}>{item.title}</strong>
                    <span style={{ color: '#7F1D1D', fontSize: '14px' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h3 style={{ fontSize: '28px', color: '#10B981', marginBottom: '32px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '12px' }}>🛡️</span>
                How Detection Tools Work
              </h3>
              
              <div style={{ 
                backgroundColor: 'white', 
                padding: '32px', 
                borderRadius: '16px',
                marginBottom: '32px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ color: '#1F2937', marginBottom: '16px', fontSize: '20px' }}>🔬 Technical Analysis</h4>
                <ul style={{ color: '#6B7280', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li>Pixel-level artifact detection</li>
                  <li>Mathematical inconsistencies in image data</li>
                  <li>Compression signature analysis</li>
                  <li>Frequency domain examination</li>
                </ul>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '32px', 
                borderRadius: '16px',
                marginBottom: '32px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ color: '#1F2937', marginBottom: '16px', fontSize: '20px' }}>🤖 AI vs AI</h4>
                <p style={{ color: '#6B7280', lineHeight: '1.7' }}>
                  Ironically, the best tools to detect AI images are other AI systems trained specifically 
                  to spot the subtle patterns that generative models leave behind.
                </p>
              </div>

              <div style={{ 
                backgroundColor: '#ECFDF5', 
                padding: '32px', 
                borderRadius: '16px',
                marginBottom: '32px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ color: '#1F2937', marginBottom: '16px', fontSize: '20px' }}>🔍 Popular Detection Tools</h4>
                <ul style={{ color: '#6B7280', lineHeight: '1.8', paddingLeft: '20px', textAlign: 'left' }}>
                  <li><strong>AI or Not:</strong> Browser-based detection tool</li>
                  <li><strong>Hive Moderation:</strong> API for content verification</li>
                  <li><strong>Optic ID:</strong> Real-time image authentication</li>
                  <li><strong>Sensity:</strong> Enterprise deepfake detection</li>
                </ul>
                <p style={{ 
                  color: '#047857', 
                  fontSize: '14px',
                  fontStyle: 'italic',
                  marginTop: '16px'
                }}>
                  💡 Pro tip: Even the best tools aren't 100% accurate - human judgment combined with technology works best!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Future Impact */}
        <section style={{ maxWidth: '1200px', margin: '0 auto 100px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: '60px' }}>
            🔮 What's Next?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', marginBottom: '60px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              padding: '40px', 
              borderRadius: '20px', 
              color: 'white', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚖️</div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Legal Evolution</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                New laws and regulations are emerging to address deepfakes, copyright, and digital authenticity.
              </p>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
              padding: '40px', 
              borderRadius: '20px', 
              color: 'white', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Creative Revolution</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                AI will democratize visual creation, allowing anyone to produce professional-quality imagery.
              </p>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
              padding: '40px', 
              borderRadius: '20px', 
              color: 'white', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Trust Systems</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Blockchain verification and digital signatures will become essential for authentic media.
              </p>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#1F2937', 
            color: 'white', 
            padding: '60px', 
            borderRadius: '20px', 
            textAlign: 'center' 
          }}>
            <h3 style={{ fontSize: '36px', marginBottom: '24px' }}>The Bottom Line</h3>
            <p style={{ fontSize: '20px', lineHeight: '1.7', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
              We're living through a fundamental shift in how visual media works. The key isn't to fear AI images, 
              but to become more sophisticated consumers of digital content. Critical thinking and verification 
              skills are now more important than ever.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', 
            padding: '60px', 
            borderRadius: '20px', 
            color: 'white' 
          }}>
            <h3 style={{ fontSize: '32px', marginBottom: '20px' }}>Ready to Test Your Skills?</h3>
            <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
              Now that you know the science behind AI detection, see how well you can spot the fakes!
            </p>
            <button
              onClick={handleStartGame}
              style={{ 
                backgroundColor: 'white', 
                color: '#4F46E5', 
                padding: '16px 32px', 
                fontSize: '20px', 
                fontWeight: 'bold',
                border: 'none', 
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              🎯 Take the Challenge
            </button>
          </div>
        </section>
      </div>
    </div>
  );

  const renderResultsPage = () => {
    const percentage = Math.round((score.correct / score.total) * 100);
    
    const getResultMessage = () => {
      if (percentage >= 90) return "Outstanding! You have an exceptional eye for detail.";
      if (percentage >= 70) return "Great job! You're quite good at spotting AI images.";
      if (percentage >= 50) return "Not bad! You're getting the hang of it.";
      return "Keep practicing! AI images are getting more convincing every day.";
    };

    const getResultEmoji = () => {
      if (percentage >= 90) return "🎯";
      if (percentage >= 70) return "🎉";
      if (percentage >= 50) return "👍";
      return "🧐";
    };

    return (
      <div style={{ 
        padding: '40px', 
        backgroundColor: '#4F46E5', 
        minHeight: '100vh',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          maxWidth: '600px', 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          padding: '40px', 
          textAlign: 'center',
          color: '#1F2937'
        }}>
          {/* Results header */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>{getResultEmoji()}</div>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>Game Complete!</h2>
            <p style={{ fontSize: '18px', color: '#6B7280' }}>{getResultMessage()}</p>
          </div>

          {/* Score display */}
          <div style={{ 
            background: 'linear-gradient(to right, #4F46E5, #3B82F6)', 
            borderRadius: '12px', 
            padding: '30px', 
            marginBottom: '30px', 
            color: 'white' 
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
              {score.correct}/{score.total}
            </div>
            <div style={{ fontSize: '18px', opacity: 0.9, marginBottom: '10px' }}>Correct Answers</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{percentage}%</div>
          </div>

          {/* Performance breakdown */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px', 
            marginBottom: '30px' 
          }}>
            <div style={{ backgroundColor: '#D1FAE5', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>{score.correct}</div>
              <div style={{ color: '#047857' }}>Correct</div>
            </div>
            <div style={{ backgroundColor: '#FEE2E2', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#DC2626' }}>{score.total - score.correct}</div>
              <div style={{ color: '#B91C1C' }}>Incorrect</div>
            </div>
          </div>

          {/* Fun fact */}
          <div style={{ 
            backgroundColor: '#F3F4F6', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '30px' 
          }}>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              <strong>Did you know?</strong> Studies show that humans can only identify AI-generated images 
              correctly about 50-60% of the time. AI image quality has improved dramatically in recent years!
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              onClick={handleStartGame}
              style={{ 
                backgroundColor: '#4F46E5', 
                color: 'white', 
                padding: '15px 30px', 
                fontSize: '18px', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Play Again
            </button>
            
            <button
              onClick={() => setCurrentView('home')}
              style={{ 
                backgroundColor: 'white', 
                color: '#4F46E5', 
                padding: '15px 30px', 
                fontSize: '18px', 
                border: '2px solid #4F46E5', 
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'home' && renderHomepage()}
      {currentView === 'game' && renderGamePage()}
      {currentView === 'info' && renderInfoPage()}
      {currentView === 'results' && renderResultsPage()}
    </div>
  );
}

export default App;