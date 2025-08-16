'use client';

import React, { useRef, useState, useEffect } from "react";

// TypeScript declaration for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

// Card data interface
interface CardData {
  id: string;
  title: string;
  description?: string;
  image?: string;
  styling?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    borderRadius?: string;
    boxShadow?: string;
    width?: number;
    height?: number;
    mobileWidth?: number;
    mobileHeight?: number;
  };
  position?: {
    x: number;
    y: number;
  };
  mobilePosition?: {
    x: number;
    y: number;
  };
}

// Sample JSON data for multiple cards
const cardsData: CardData[] = [
  {
    id: "card-1",
    title: "You are just wasting your time....",
    description: "",
    image: "/images/card1.svg",
    styling: {
      backgroundColor: "none",
      color: "#333",
      fontSize: "16px",
      height: 200,
      width: 300,
      mobileWidth: 200,
      mobileHeight: 150,
      fontWeight: "400",
    },
    position: { x: 50, y: 50 }, // desktop position
    mobilePosition: { x: 20, y: 100 }, // mobile position
  },
  {
    id: "card-2",
    title: "",
    image: "/images/card2.svg",
    description: "",
    styling: {
        backgroundColor: "none",
        color: "#333",
        fontSize: "16px",
        height: 400,
        width: 500,
        mobileWidth: 250,
        mobileHeight: 200,
        fontWeight: "400",
    },
    position: { x: 1000, y: 50 }, // desktop position
    mobilePosition: { x: 20, y: 300 }, // mobile position
  },
];

const MoveableCard: React.FC = () => {
  const [cards, setCards] = useState(cardsData.map(card => ({
    ...card,
    position: card.position || { x: 50, y: 50 },
    mobilePosition: card.mobilePosition || { x: 20, y: 100 }
  })));
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [sectionBounds, setSectionBounds] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // MetaMask connection check
  useEffect(() => {
    const checkMetaMask = async () => {
      try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
          console.log('MetaMask is installed!');
          
          // Check if MetaMask is unlocked
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length === 0) {
            console.log('MetaMask is locked. Please unlock it.');
          } else {
            console.log('MetaMask is connected:', accounts[0]);
          }
        } else {
          console.log('MetaMask is not installed');
        }
      } catch (error) {
        console.error('MetaMask connection error:', error);
        // Handle the error gracefully without breaking the app
      }
    };

    checkMetaMask();
  }, []);

  // Get section boundaries and update position on scroll
  useEffect(() => {
    const updateSectionBounds = () => {
      // Find the hero section (parent section of the card)
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setSectionBounds({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateSectionBounds();
    window.addEventListener('resize', updateSectionBounds);
    window.addEventListener('scroll', updateSectionBounds);

    return () => {
      window.removeEventListener('resize', updateSectionBounds);
      window.removeEventListener('scroll', updateSectionBounds);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent, cardId: string) => {
    // Disable dragging on mobile devices
    if (isMobile) return;
    
    setDraggedCardId(cardId);
    const cardElement = e.currentTarget as HTMLDivElement;
    const rect = cardElement.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    // Prevent text selection
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!draggedCardId || isMobile) return;
    
    // Calculate new position relative to the section
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    
    // Get the dragged card
    const draggedCard = cards.find(card => card.id === draggedCardId);
    if (!draggedCard) return;
    
    // Card dimensions based on screen size
    const cardWidth = isMobile 
      ? (draggedCard.styling?.mobileWidth || 200)
      : (draggedCard.styling?.width || 320);
    const cardHeight = isMobile 
      ? (draggedCard.styling?.mobileHeight || 150)
      : (draggedCard.styling?.height || 120);
    
    // Calculate boundaries within the section
    const minX = sectionBounds.left;
    const maxX = sectionBounds.left + sectionBounds.width - cardWidth;
    const minY = sectionBounds.top;
    const maxY = sectionBounds.top + sectionBounds.height - cardHeight;
    
    // Constrain position within section boundaries
    const constrainedX = Math.max(minX, Math.min(maxX, newX));
    const constrainedY = Math.max(minY, Math.min(maxY, newY));
    
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === draggedCardId 
          ? { ...card, position: { x: constrainedX, y: constrainedY } }
          : card
      )
    );
  };

  const onMouseUp = () => {
    setDraggedCardId(null);
  };

  React.useEffect(() => {
    if (draggedCardId && !isMobile) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggedCardId, offset, sectionBounds, isMobile]);

  return (
    <>
      {cards.map((card) => {
        const isDragging = draggedCardId === card.id;
        const cardStyle = card.styling || {};
        
        // Get current position based on screen size
        const currentPosition = isMobile ? card.mobilePosition : card.position;
        
        // Get current dimensions based on screen size
        const currentWidth = isMobile 
          ? (cardStyle.mobileWidth || 200)
          : (cardStyle.width || 320);
        const currentHeight = isMobile 
          ? (cardStyle.mobileHeight || 150)
          : (cardStyle.height || 120);
        
        return (
          <div
            key={card.id}
            onMouseDown={(e) => onMouseDown(e, card.id)}
            className={`
              absolute select-none transition-shadow duration-200 ease-in-out
              hidden md:block
              ${isDragging ? 'z-[10000] cursor-grabbing' : 'z-[9999] cursor-grab'}
            `}
            style={{
              top: currentPosition?.y || 50,
              left: (currentPosition?.x || 50) + (isDragging ? 10 : 0),
              width: currentWidth,
              height: currentHeight,
              backgroundColor: cardStyle.backgroundColor || "white",
              color: cardStyle.color || "#333",
              borderRadius: cardStyle.borderRadius || "12px",
              // Remove shadow for SVG images entirely
              boxShadow: (card.image && card.image.endsWith('.svg'))
                ? "none"
                : (
                  isDragging
                    ? "0 12px 40px 0 rgba(0,0,0,0.35), 0 2px 8px 0 rgba(0,0,0,0.18)"
                    : (cardStyle.boxShadow || "0 4px 24px rgba(0,0,0,0.15)")
                ),
              fontSize: isMobile ? '14px' : (cardStyle.fontSize || "16px"),
              fontWeight: cardStyle.fontWeight || "400",
              transition: isDragging ? "none" : "box-shadow 0.2s",
            }}
          >
            {card.image && (
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-auto rounded-lg mt-3 object-cover"
                />
              )}
            <div className="text-center h-full flex flex-col">
              <h3 className={`
                m-0 font-semibold
                ${cardStyle.fontWeight ? `font-[${cardStyle.fontWeight}]` : 'font-semibold'}
                ${isMobile ? 'text-sm' : (cardStyle.fontSize ? `text-[${cardStyle.fontSize}]` : 'text-xl')}
              `}>
                {card.title}
              </h3>
              {card.description && (
                <p className={`
                  mt-3 text-sm leading-relaxed
                  ${cardStyle.color ? `text-[${cardStyle.color}]` : 'text-gray-600'}
                  ${isMobile ? 'text-xs' : (cardStyle.fontSize ? `text-[${cardStyle.fontSize}]` : 'text-base')}
                `}>
                  {card.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MoveableCard;
