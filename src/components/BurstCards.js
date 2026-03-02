import { useEffect, useState, useCallback, useRef, memo } from "react";
import logo from '../images/BeausAnimalCare.svg';

export function BurstCards({ cards, open, onClose, origin, accentColor }) {
  const [visible, setVisible] = useState(false);
  const [scattered, setScattered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showGoBackText, setShowGoBackText] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Flip header between logo and "go back home" text every 3 seconds (only when not hovering)
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      if (!headerHovered) {
        setShowGoBackText(prev => !prev);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [open, headerHovered]);

  // Show "go back home" when hovering
  const shouldShowText = headerHovered || showGoBackText;

  useEffect(() => {
    if (open) {
      setVisible(true);
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setScattered(true));
      });
      return () => cancelAnimationFrame(t);
    } else {
      setScattered(false);
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === containerRef.current || e.target.dataset.backdrop === "true") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!visible) return null;

  /* --- MOBILE: scrollable stacked layout --- */
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        data-backdrop="true"
        onClick={handleBackdropClick}
        className="burst-cards-mobile"
        style={{
          backgroundColor: scattered ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
          backdropFilter: scattered ? "blur(16px)" : "blur(0px)",
          transition: "background-color 400ms ease, backdrop-filter 400ms ease",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Content cards"
      >
        {/* Header logo/text - clickable */}
        <div
          className="burst-modal-header"
          onClick={onClose}
          onMouseEnter={() => setHeaderHovered(true)}
          onMouseLeave={() => setHeaderHovered(false)}
          style={{
            opacity: scattered ? 1 : 0,
            transition: "opacity 400ms ease 200ms, transform 300ms ease",
            cursor: "pointer",
            transform: headerHovered ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img
              src={logo}
              alt="Beau's Animal Care"
              className="burst-modal-logo"
              style={{
                transform: shouldShowText ? "rotateY(90deg)" : "rotateY(0deg)",
                opacity: shouldShowText ? 0 : 1,
                transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) ${shouldShowText ? "rotateY(0deg)" : "rotateY(-90deg)"}`,
                opacity: shouldShowText ? 1 : 0,
                fontFamily: "'HEYA Sans Outline', Georgia, 'Times New Roman', serif",
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "900",
                color: accentColor,
                textTransform: "lowercase",
                letterSpacing: "0.02em",
                transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
                whiteSpace: "nowrap",
              }}
            >
              ← go back home
            </div>
          </div>
        </div>

        <div className="burst-cards-mobile-content">
          {cards.map((card, i) => {
            const CardIcon = card.icon;
            const bgTint = card.tint || `${accentColor}06`;

            return (
              <div
                key={card.id}
                className="burst-card-mobile-wrapper"
                style={{
                  opacity: scattered ? 1 : 0,
                  transform: scattered
                    ? "translateY(0) scale(1)"
                    : `translateY(40px) scale(0.9)`,
                  transition: `opacity 400ms ease ${i * 80}ms, transform 500ms cubic-bezier(0.34, 1.3, 0.64, 1) ${i * 80}ms`,
                }}
              >
                <CardInner card={card} CardIcon={CardIcon} bgTint={bgTint} accentColor={accentColor} onClose={onClose} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* --- DESKTOP: row-based grid layout --- */
  return (
    <div
      ref={containerRef}
      onClick={handleBackdropClick}
      className="burst-cards-desktop"
      style={{
        backgroundColor: scattered ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
        backdropFilter: scattered ? "blur(16px)" : "blur(0px)",
        transition: "background-color 450ms ease, backdrop-filter 450ms ease",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Content cards"
    >
      {/* Header logo/text - clickable */}
      <div
        className="burst-modal-header"
        onClick={onClose}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        style={{
          opacity: scattered ? 1 : 0,
          transition: "opacity 400ms ease 200ms, transform 300ms ease",
          cursor: "pointer",
          transform: headerHovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img
            src={logo}
            alt="Beau's Animal Care"
            className="burst-modal-logo"
            style={{
              transform: shouldShowText ? "rotateY(90deg)" : "rotateY(0deg)",
              opacity: shouldShowText ? 0 : 1,
              transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) ${shouldShowText ? "rotateY(0deg)" : "rotateY(-90deg)"}`,
              opacity: shouldShowText ? 1 : 0,
              fontFamily: "'HEYA Sans Outline', Georgia, 'Times New Roman', serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "900",
              color: accentColor,
              textTransform: "lowercase",
              letterSpacing: "0.02em",
              transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
              whiteSpace: "nowrap",
            }}
          >
            ← go back home
          </div>
        </div>
      </div>


      <div className="burst-cards-desktop-content">
        {cards.map((card, i) => {
          const CardIcon = card.icon;
          const bgTint = card.tint || `${accentColor}06`;

          return (
            <div
              key={card.id}
              className={`burst-card-desktop-wrapper burst-card-${card.shape}`}
              style={{
                opacity: scattered ? 1 : 0,
                transform: scattered
                  ? "translateY(0) scale(1)"
                  : `translateY(40px) scale(0.9)`,
                transition: `opacity 400ms ease ${i * 60}ms, transform 500ms cubic-bezier(0.34, 1.3, 0.64, 1) ${i * 60}ms`,
              }}
            >
              <CardInner card={card} CardIcon={CardIcon} bgTint={bgTint} accentColor={accentColor} onClose={onClose} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ——— Shared card inner content ——— */

const CardInner = memo(function CardInner({ card, CardIcon, bgTint, accentColor, onClose }) {
  const [iconSize, setIconSize] = useState(80);
  const [isDesktop, setIsDesktop] = useState(false);
  const [useSplitLayout, setUseSplitLayout] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setIconSize(100);
        setIsDesktop(true);
      } else if (width > 900) {
        setIconSize(90);
        setIsDesktop(true);
      } else {
        setIconSize(80);
        setIsDesktop(false);
      }

      // Split layout for cards with images: only on desktop (above 1285px)
      setUseSplitLayout(width > 1285);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const padding = card.shape === "pill"
    ? (isDesktop ? "24px 36px" : "20px 28px")
    : (isDesktop ? "32px" : "24px");

  // Extract vertical and horizontal padding for image margins
  const paddingParts = padding.split(" ");
  const verticalPadding = paddingParts[0];
  const horizontalPadding = paddingParts[1] || paddingParts[0];

  // Use bright color if provided, otherwise use bgTint
  const backgroundColor = card.color || bgTint;
  const isColorful = !!card.color;
  const textColor = isColorful ? "#000000" : "#3A3A3A";
  const contentOpacity = isColorful ? 0.85 : 0.55;

  // For cards with images, use side-by-side layout above 444px
  const hasImage = !!card.image;
  const useSideBySide = hasImage && useSplitLayout;
  const imageOnRight = card.imagePosition === "right";
  const imagePercent = card.imageSize === "small" ? "35%" : "45%";

  return (
    <div
      className="burst-card-inner"
      onClick={card.isHomeButton ? onClose : (card.link ? () => window.open(card.link.url, card.link.url.startsWith('tel:') || card.link.url.startsWith('mailto:') ? '_self' : '_blank') : undefined)}
      style={{
        borderRadius: card.shape === "pill" ? "32px" : "20px",
        padding: useSideBySide ? "0" : padding,
        backgroundColor: isColorful ? "#FFFFFF" : backgroundColor,
        border: isColorful ? `5px solid ${card.color}` : `1.5px solid ${accentColor}18`,
        boxShadow: isColorful
          ? `0 0 60px ${card.color}40, 0 20px 50px ${card.color}25, 0 4px 12px rgba(0,0,0,0.08)`
          : `0 8px 32px ${accentColor}08, 0 2px 8px rgba(0,0,0,0.03)`,
        display: "flex",
        flexDirection: useSideBySide ? (imageOnRight ? "row-reverse" : "row") : "column",
        justifyContent: useSideBySide ? "flex-start" : "center",
        overflow: "hidden",
        cursor: (card.isHomeButton || card.link) ? "pointer" : "default",
        transition: "transform 300ms ease, box-shadow 300ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = isColorful
          ? `0 0 80px ${card.color}50, 0 24px 60px ${card.color}30, 0 6px 16px rgba(0,0,0,0.12)`
          : `0 12px 40px ${accentColor}12, 0 4px 12px rgba(0,0,0,0.06)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isColorful
          ? `0 0 60px ${card.color}40, 0 20px 50px ${card.color}25, 0 4px 12px rgba(0,0,0,0.08)`
          : `0 8px 32px ${accentColor}08, 0 2px 8px rgba(0,0,0,0.03)`;
      }}
    >
      {useSideBySide ? (
        <>
          {/* Image side */}
          <div style={{
            flex: `0 0 ${imagePercent}`,
            position: "relative",
            overflow: "hidden",
            maxHeight: card.imageSize === "small" ? "280px" : "550px",
          }}>
            <img
              src={card.image}
              alt={card.title || "Card image"}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                objectPosition: card.imageSize === "small" ? "center center" : "50% 70%",
                transform: card.imageSize === "small" ? "scale(1.1)" : "scale(1)",
              }}
            />
          </div>

          {/* Text side */}
          <div style={{
            flex: "1",
            padding: "32px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {/* Watermark icon */}
            {CardIcon && !card.tag && (
              <CardIcon
                className="burst-card-watermark"
                style={{ color: isColorful ? `${card.color}15` : accentColor }}
                size={iconSize}
                strokeWidth={1}
              />
            )}

            {/* Title and Tag - layout depends on card type */}
            {card.imageSize === "small" ? (
              // Service cards: Tag on right of title
              card.title && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  gap: "12px",
                }}>
                  <h3 className="burst-card-title" style={{
                    color: textColor,
                    textShadow: "none",
                    fontWeight: "900",
                    margin: "0",
                  }}>
                    {card.title}
                  </h3>
                  {card.tag && (
                    <span className="burst-card-tag" style={{ margin: "0", flexShrink: 0 }}>
                      {CardIcon && (
                        <CardIcon
                          size={18}
                          strokeWidth={2}
                          style={{ color: isColorful ? card.color : accentColor }}
                        />
                      )}
                      <span
                        className="burst-card-tag-text"
                        style={{
                          color: isColorful ? card.color : accentColor,
                          textShadow: "none",
                        }}
                      >
                        {card.tag}
                      </span>
                    </span>
                  )}
                </div>
              )
            ) : (
              // About cards: Tag above title or icon to right
              <>
                {card.showIconRight ? (
                  // Icon to right of title
                  card.title && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      gap: "12px",
                    }}>
                      <h3 className="burst-card-title" style={{
                        color: textColor,
                        textShadow: "none",
                        fontWeight: "900",
                        margin: "0",
                      }}>
                        {card.title}
                      </h3>
                      {CardIcon && (
                        <CardIcon
                          size={24}
                          strokeWidth={2}
                          style={{ color: isColorful ? card.color : accentColor, flexShrink: 0 }}
                        />
                      )}
                    </div>
                  )
                ) : card.isHomeButton ? (
                  // Home button - just centered text
                  card.title && (
                    <h3 className="burst-card-title" style={{
                      color: textColor,
                      textShadow: "none",
                      fontWeight: "900",
                      margin: "0",
                      textAlign: "center",
                    }}>
                      {card.title}
                    </h3>
                  )
                ) : (
                  // Traditional layout: Tag above title
                  <>
                    {card.tag && (
                      <span className="burst-card-tag">
                        {CardIcon && (
                          <CardIcon
                            size={18}
                            strokeWidth={2}
                            style={{ color: isColorful ? card.color : accentColor }}
                          />
                        )}
                        <span
                          className="burst-card-tag-text"
                          style={{
                            color: isColorful ? card.color : accentColor,
                            textShadow: "none",
                          }}
                        >
                          {card.tag}
                        </span>
                      </span>
                    )}
                    {card.title && (
                      card.columnLayout ? (
                        // Service locations with icon
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "8px",
                        }}>
                          {CardIcon && (
                            <CardIcon
                              size={26}
                              strokeWidth={2}
                              style={{ color: isColorful ? card.color : accentColor, flexShrink: 0 }}
                            />
                          )}
                          <h3 className="burst-card-title" style={{
                            color: textColor,
                            textShadow: "none",
                            fontWeight: "900",
                            margin: "0",
                          }}>
                            {card.title}
                          </h3>
                        </div>
                      ) : (
                        <h3 className="burst-card-title" style={{
                          color: textColor,
                          textShadow: "none",
                          fontWeight: "900",
                        }}>
                          {card.title}
                        </h3>
                      )
                    )}
                  </>
                )}
              </>
            )}

            {/* Column layout for service locations on desktop */}
            {card.columnLayout && card.columns && useSplitLayout ? (
              <div style={{
                display: "flex",
                gap: "32px",
                marginTop: "12px",
              }}>
                {card.columns.map((col, idx) => (
                  <div key={idx} style={{ flex: "1", minWidth: "0" }}>
                    <div style={{
                      fontFamily: "'HEYA Sans Outline', Georgia, 'Times New Roman', serif",
                      fontWeight: "900",
                      fontSize: "16px",
                      color: isColorful ? card.color : accentColor,
                      marginBottom: "6px",
                    }}>
                      {col.label}
                    </div>
                    <div className="burst-card-content" style={{
                      color: isColorful ? `rgba(0,0,0,${contentOpacity})` : `rgba(58, 58, 58, 0.75)`,
                      fontSize: "17px",
                      lineHeight: "1.5",
                    }}>
                      {col.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : card.columnLayout && card.columns ? (
              // Mobile: stacked layout with labels
              <div style={{ marginTop: "8px" }}>
                {card.columns.map((col, idx) => (
                  <p key={idx} className="burst-card-content" style={{
                    color: isColorful ? `rgba(0,0,0,${contentOpacity})` : `rgba(58, 58, 58, 0.75)`,
                    textShadow: "none",
                    marginBottom: idx < card.columns.length - 1 ? "12px" : "0",
                  }}>
                    <span style={{
                      fontFamily: "'HEYA Sans Outline', Georgia, 'Times New Roman', serif",
                      fontWeight: "900"
                    }}>
                      {col.label}
                    </span>{" "}
                    {col.value}
                  </p>
                ))}
              </div>
            ) : card.content ? (
              Array.isArray(card.content) ? (
                card.content.map((paragraph, idx) => (
                  <p key={idx} className="burst-card-content" style={{
                    color: isColorful ? `rgba(0,0,0,${contentOpacity})` : `rgba(58, 58, 58, 0.75)`,
                    textShadow: "none",
                    marginBottom: idx < card.content.length - 1 ? "16px" : "0",
                  }}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="burst-card-content" style={{
                  color: isColorful ? `rgba(0,0,0,${contentOpacity})` : `rgba(58, 58, 58, 0.75)`,
                  textShadow: "none",
                }}>
                  {card.content}
                </p>
              )
            ) : null}

            {/* Optional link */}
            {card.link && (
              <div style={{ marginTop: "16px" }}>
                <a
                  href={card.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline",
                    fontFamily: "'HEYA Sans Outline', Georgia, 'Times New Roman', serif",
                    fontSize: "17px",
                    fontWeight: "900",
                    color: isColorful ? card.color : accentColor,
                    textDecoration: "none",
                    textShadow: "none",
                    borderBottom: `2px solid ${isColorful ? `${card.color}40` : `${accentColor}40`}`,
                    paddingBottom: "2px",
                    transition: "border-color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderBottomColor = isColorful ? card.color : accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderBottomColor = isColorful ? `${card.color}40` : `${accentColor}40`;
                  }}
                >
                  {card.link.label} →
                </a>
              </div>
            )}

            {/* Optional contacts */}
            {card.contacts && (
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {card.contacts.map((contact, index) => {
                  const ContactIcon = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.url}
                      target={contact.type === "phone" || contact.type === "email" ? "_self" : "_blank"}
                      rel={contact.type === "phone" || contact.type === "email" ? undefined : "noopener noreferrer"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 16px",
                        backgroundColor: isColorful ? "rgba(255,255,255,0.15)" : `${accentColor}10`,
                        borderRadius: "12px",
                        textDecoration: "none",
                        color: isColorful ? "#FFFFFF" : accentColor,
                        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
                        fontSize: "15px",
                        fontWeight: "600",
                        textShadow: isColorful ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
                        transition: "all 200ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isColorful ? "rgba(255,255,255,0.25)" : `${accentColor}20`;
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isColorful ? "rgba(255,255,255,0.15)" : `${accentColor}10`;
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <ContactIcon size={20} />
                      <span>{contact.label}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Card image for ABOUT cards (not service cards) - at the top */}
          {card.image && card.imageSize !== "small" && (
            <div style={{
              margin: `-${verticalPadding} -${horizontalPadding} 16px -${horizontalPadding}`,
              overflow: "hidden",
              borderBottom: `4px solid ${isColorful ? card.color : accentColor}`,
            }}>
              <img
                src={card.image}
                alt={card.title || "Card image"}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transform: card.imageSize === "small" ? "scale(1.1)" : "scale(1)",
                }}
              />
            </div>
          )}

          {/* Watermark icon */}
          {CardIcon && !card.image && (
            <CardIcon
              className="burst-card-watermark"
              style={{ color: isColorful ? `${card.color}15` : accentColor }}
              size={iconSize}
              strokeWidth={1}
            />
          )}

          {/* Title and Tag - layout depends on card type */}
          {card.imageSize === "small" ? (
            // Service cards: Tag on right of title
            card.title && (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
                gap: "12px",
              }}>
                <h3 className="burst-card-title" style={{
                  color: textColor,
                  textShadow: "none",
                  fontWeight: "900",
                  margin: "0",
                }}>
                  {card.title}
                </h3>
                {card.tag && (
                  <span className="burst-card-tag" style={{ margin: "0", flexShrink: 0 }}>
                    {CardIcon && (
                      <CardIcon
                        size={isDesktop ? 15 : 13}
                        strokeWidth={2}
                        style={{ color: isColorful ? card.color : accentColor }}
                      />
                    )}
                    <span
                      className="burst-card-tag-text"
                      style={{
                        color: isColorful ? card.color : accentColor,
                        textShadow: "none",
                      }}
                    >
                      {card.tag}
                    </span>
                  </span>
                )}
              </div>
            )
          ) : (
            // About cards: Tag above title or icon to right
            <>
              {card.showIconRight ? (
                // Icon to right of title
                card.title && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    gap: "12px",
                  }}>
                    <h3 className="burst-card-title" style={{
                      color: textColor,
                      textShadow: "none",
                      fontWeight: "900",
                      margin: "0",
                    }}>
                      {card.title}
                    </h3>
                    {CardIcon && (
                      <CardIcon
                        size={isDesktop ? 24 : 20}
                        strokeWidth={2}
                        style={{ color: isColorful ? card.color : accentColor, flexShrink: 0 }}
                      />
                    )}
                  </div>
                )
              ) : card.isHomeButton ? (
                // Home button - just centered text
                card.title && (
                  <h3 className="burst-card-title" style={{
                    color: textColor,
                    textShadow: "none",
                    fontWeight: "900",
                    margin: "0",
                    textAlign: "center",
                  }}>
                    {card.title}
                  </h3>
                )
              ) : (
                // Traditional layout: Tag above title
                <>
                  {card.tag && (
                    <span className="burst-card-tag">
                      {CardIcon && (
                        <CardIcon
                          size={isDesktop ? 15 : 13}
                          strokeWidth={2}
                          style={{ color: isColorful ? card.color : accentColor }}
                        />
                      )}
                      <span
                        className="burst-card-tag-text"
                        style={{
                          color: isColorful ? card.color : accentColor,
                          textShadow: "none",
                        }}
                      >
                        {card.tag}
                      </span>
                    </span>
                  )}
                  {card.title && (
                    card.columnLayout ? (
                      // Service locations with icon
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "8px",
                      }}>
                        {CardIcon && (
                          <CardIcon
                            size={isDesktop ? 26 : 22}
                            strokeWidth={2}
                            style={{ color: isColorful ? card.color : accentColor, flexShrink: 0 }}
                          />
                        )}
                        <h3 className="burst-card-title" style={{
                          color: textColor,
                          textShadow: "none",
                          fontWeight: "900",
                          margin: "0",
                        }}>
                          {card.title}
                        </h3>
                      </div>
                    ) : (
                      <h3 className="burst-card-title" style={{
                        color: textColor,
                        textShadow: "none",
                        fontWeight: "900",
                      }}>
                        {card.title}
                      </h3>
                    )
                  )}
                </>
              )}
            </>
          )}

          {/* Column layout for service locations */}
          {card.columnLayout && card.columns ? (
            // Mobile: stacked layout with labels
            <div style={{ marginTop: "8px" }}>
              {card.columns.map((col, idx) => (
                <p key={idx} className="burst-card-content" style={{
                  color: isColorful ? `rgba(0,0,0,${contentOpacity})` : `rgba(58, 58, 58, 0.75)`,
                  textShadow: "none",
                  marginBottom: idx < card.columns.length - 1 ? "12px" : "0",
                }}>
                  <span style={{
                    fontFamily: "'HEYA Sans Outline', Georgia, 'Times New Roman', serif",
                    fontWeight: "900"
                  }}>
                    {col.label}
                  </span>{" "}
                  {col.value}
                </p>
              ))}
            </div>
          ) : card.content ? (
            Array.isArray(card.content) ? (
              card.content.map((paragraph, idx) => (
                <p key={idx} className="burst-card-content" style={{
                  color: isColorful ? `rgba(0,0,0,${contentOpacity})` : `rgba(58, 58, 58, 0.75)`,
                  textShadow: "none",
                  marginBottom: idx < card.content.length - 1 ? "16px" : "0",
                }}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="burst-card-content" style={{
                color: isColorful ? `rgba(0,0,0,${contentOpacity})` : `rgba(58, 58, 58, 0.75)`,
                textShadow: "none",
              }}>
                {card.content}
              </p>
            )
          ) : null}

          {/* Optional link - before image */}
          {card.link && (
            <div style={{ marginTop: "16px" }}>
              <a
                href={card.link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline",
                  fontFamily: "'HEYA Sans Outline', Georgia, 'Times New Roman', serif",
                  fontSize: "17px",
                  fontWeight: "900",
                  color: isColorful ? card.color : accentColor,
                  textDecoration: "none",
                  textShadow: "none",
                  borderBottom: `2px solid ${isColorful ? `${card.color}40` : `${accentColor}40`}`,
                  paddingBottom: "2px",
                  transition: "border-color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderBottomColor = isColorful ? card.color : accentColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderBottomColor = isColorful ? `${card.color}40` : `${accentColor}40`;
                }}
              >
                {card.link.label} →
              </a>
            </div>
          )}

          {/* Card image for SERVICE cards only - at the bottom */}
          {card.image && card.imageSize === "small" && (
            <div style={{
              margin: `16px -${horizontalPadding} -${verticalPadding} -${horizontalPadding}`,
              overflow: "hidden",
              borderTop: `4px solid ${isColorful ? card.color : accentColor}`,
              paddingTop: "0",
            }}>
              <img
                src={card.image}
                alt={card.title || "Card image"}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transform: card.imageSize === "small" ? "scale(1.1)" : "scale(1)",
                }}
              />
            </div>
          )}

          {/* Optional contacts */}
          {card.contacts && (
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {card.contacts.map((contact, index) => {
                const ContactIcon = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.url}
                    target={contact.type === "phone" || contact.type === "email" ? "_self" : "_blank"}
                    rel={contact.type === "phone" || contact.type === "email" ? undefined : "noopener noreferrer"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 16px",
                      backgroundColor: isColorful ? `${card.color}15` : `${accentColor}10`,
                      borderRadius: "12px",
                      textDecoration: "none",
                      color: isColorful ? card.color : accentColor,
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      textShadow: "none",
                      transition: "all 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isColorful ? `${card.color}25` : `${accentColor}20`;
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isColorful ? `${card.color}15` : `${accentColor}10`;
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <ContactIcon size={20} />
                    <span>{contact.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
});
