import React, { useState, useMemo, useEffect } from 'react';
import './Achievement.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, start + maxVisible - 1);

            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }

            if (start > 1) pages.push(1);
            if (start > 2) pages.push('...');

            for (let i = start; i <= end; i++) {
                if (i > 0 && i <= totalPages) pages.push(i);
            }

            if (end < totalPages - 1) pages.push('...');
            if (end < totalPages) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <nav className="pagination-nav">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button pagination-button-prev-next"
            >
                &laquo;
            </button>

            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={index} className="pagination-ellipsis">...</span>
                ) : (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`pagination-button ${
                            currentPage === page
                                ? 'pagination-button-active'
                                : 'pagination-button-inactive'
                        }`}
                    >
                        {page}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button pagination-button-prev-next"
            >
                &raquo;
            </button>
        </nav>
    );
};

const Achievement = () => {
    const [certifications, setCertifications] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await fetch('https://portfolio-v5tt.onrender.com/api/certifications');
                const data = await response.json();
                setCertifications(data);
            } catch (error) {
                console.error('Error fetching certifications:', error);
            }
        };
        fetchCertifications();
    }, []);

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth <= 480) {
                setItemsPerPage(4);
            } else if (window.innerWidth <= 768) {
                setItemsPerPage(6);
            } else {
                setItemsPerPage(12);
            }
        };

        window.addEventListener('resize', updateItemsPerPage);
        updateItemsPerPage();

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    const totalPages = useMemo(() => Math.ceil(certifications.length / itemsPerPage), [certifications.length, itemsPerPage]);

    const currentCertifications = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return certifications.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, certifications]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleCardClick = (cert) => {
        setSelectedCert(cert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="cert-container">
            <h2 className="cert-title">My Certifications</h2>
            <div className="cert-grid">
                {currentCertifications.map((cert, index) => (
                    <div
                        key={index}
                        className="cert-card"
                        onClick={() => handleCardClick(cert)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img src={cert.url} alt={cert.name} />
                        <div className="cert-card-overlay">
                            <h3>{cert.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {isModalOpen && selectedCert && (
                <div className="cert-modal-overlay" onClick={closeModal}>
                    <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="cert-close-button" onClick={closeModal}>×</button>
                        <img src={selectedCert.url} alt={selectedCert.name} className="cert-modal-image" />
                        <div className="cert-modal-details">
                            <h2>{selectedCert.name}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Achievement;
