import React from "react";
import TopProgressBar from "./TopProgressBar";
import { translateMessage } from "../../sharedMethod";

const shellMenuItems = Array.from({ length: 7 });
const shellCards = Array.from({ length: 4 });

const AppBootstrapLoader = ({ variant = "fullscreen", showProgress = true }) => {
    const isShellVariant = variant === "shell";
    const loadingLabel = translateMessage(
        "globally.loading.label",
        "Please wait..."
    );
    const dashboardLabel = translateMessage("dashboard.title", "Dashboard");

    return (
        <div
            className={`pos-bootstrap pos-bootstrap--${
                isShellVariant ? "shell" : "fullscreen"
            }`}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            {showProgress ? <TopProgressBar isLoading /> : null}
            {isShellVariant ? (
                <div className="pos-bootstrap-shell">
                    <aside className="pos-bootstrap-shell__sidebar">
                        <div className="pos-bootstrap-shell__brand" />
                        <div className="pos-bootstrap-shell__rail">
                            {shellMenuItems.map((_, index) => (
                                <span
                                    key={`menu-item-${index}`}
                                    className="pos-bootstrap-shell__menu-item"
                                />
                            ))}
                        </div>
                    </aside>
                    <div className="pos-bootstrap-shell__main">
                        <header className="pos-bootstrap-shell__header">
                            <div className="pos-bootstrap-shell__header-block pos-bootstrap-shell__header-block--title" />
                            <div className="pos-bootstrap-shell__header-actions">
                                <span className="pos-bootstrap-shell__chip" />
                                <span className="pos-bootstrap-shell__avatar" />
                            </div>
                        </header>
                        <main className="pos-bootstrap-shell__content">
                            <section className="pos-bootstrap-shell__hero">
                                <div className="pos-bootstrap__spinner pos-bootstrap__spinner--inline" />
                                <div className="pos-bootstrap-shell__copy">
                                    <span className="pos-bootstrap-shell__eyebrow">
                                        {dashboardLabel}
                                    </span>
                                    <strong className="pos-bootstrap-shell__label">
                                        {loadingLabel}
                                    </strong>
                                </div>
                            </section>
                            <section className="pos-bootstrap-shell__grid">
                                {shellCards.map((_, index) => (
                                    <article
                                        key={`shell-card-${index}`}
                                        className="pos-bootstrap-shell__card"
                                    >
                                        <span className="pos-bootstrap-shell__card-line pos-bootstrap-shell__card-line--title" />
                                        <span className="pos-bootstrap-shell__card-line pos-bootstrap-shell__card-line--value" />
                                        <span className="pos-bootstrap-shell__card-line pos-bootstrap-shell__card-line--meta" />
                                    </article>
                                ))}
                            </section>
                        </main>
                    </div>
                </div>
            ) : (
                <div className="pos-bootstrap__panel">
                    <div className="pos-bootstrap__spinner" />
                    <div className="pos-bootstrap__copy">
                        <span className="pos-bootstrap__eyebrow">InventaPro POS</span>
                        <strong className="pos-bootstrap__label">
                            {loadingLabel}
                        </strong>
                    </div>
                    <div className="pos-bootstrap__pulse-row" aria-hidden="true">
                        <span className="pos-bootstrap__pulse pos-bootstrap__pulse--wide" />
                        <span className="pos-bootstrap__pulse" />
                        <span className="pos-bootstrap__pulse pos-bootstrap__pulse--short" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppBootstrapLoader;
