import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout, Breadcrumb } from '../components/layout';
import { CategoryCard, Pagination } from '../components/common';

const SubSectorPage = () => {
    const { sectorId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Get sector title from ID
    const getSectorTitle = (id) => {
        const sectors = {
            'domestic': 'Domestic Tours',
            'international': 'International Tours',
            'adventure': 'Adventure Tours',
            'honeymoon': 'Couple Tours',
            'sports': 'Sports Tourism',
            'religious': 'Religious Tours',
            'beach': 'Beach Holidays',
            'wildlife': 'Wildlife Safari',
        };
        return sectors[id] || 'Tours';
    };

    // Sample sub-sectors - will be replaced by API calls
    const domesticSubSectors = [
        { id: 'kashmir', name: 'Kashmir', tourCount: 8 },
        { id: 'kerala', name: 'Kerala', tourCount: 12 },
        { id: 'goa', name: 'Goa', tourCount: 10 },
        { id: 'rajasthan', name: 'Rajasthan', tourCount: 15 },
        { id: 'himachal', name: 'Himachal Pradesh', tourCount: 9 },
        { id: 'ladakh', name: 'Ladakh', tourCount: 6 },
        { id: 'uttarakhand', name: 'Uttarakhand', tourCount: 7 },
        { id: 'andaman', name: 'Andaman', tourCount: 5 },
        { id: 'sikkim', name: 'Sikkim', tourCount: 4 },
        { id: 'meghalaya', name: 'Meghalaya', tourCount: 3 },
        { id: 'varanasi', name: 'Varanasi', tourCount: 6 },
        { id: 'ooty', name: 'Ooty', tourCount: 5 },
    ];

    const internationalSubSectors = [
        { id: 'thailand', name: 'Thailand', tourCount: 8 },
        { id: 'switzerland', name: 'Switzerland', tourCount: 6 },
        { id: 'dubai', name: 'Dubai', tourCount: 10 },
        { id: 'singapore', name: 'Singapore', tourCount: 7 },
        { id: 'maldives', name: 'Maldives', tourCount: 5 },
        { id: 'bali', name: 'Bali', tourCount: 6 },
        { id: 'paris', name: 'Paris', tourCount: 4 },
        { id: 'london', name: 'London', tourCount: 5 },
    ];

    const getSubSectors = () => {
        if (sectorId === 'domestic') return domesticSubSectors;
        if (sectorId === 'international') return internationalSubSectors;
        return domesticSubSectors; // Default
    };

    const subSectors = getSubSectors();
    const totalPages = Math.ceil(subSectors.length / itemsPerPage);
    const paginatedItems = subSectors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const breadcrumbItems = [
        { label: 'Tours', path: '/tours' },
        { label: getSectorTitle(sectorId), path: `/tours/${sectorId}` },
    ];

    return (
        <PageLayout>
            <div className="subsector-page">
                {/* Hero */}
                <section className="subsector-hero">
                    <div className="container">
                        <h1>{getSectorTitle(sectorId)}</h1>
                        <p>Explore our collection of {getSectorTitle(sectorId).toLowerCase()}</p>
                    </div>
                </section>

                {/* Content */}
                <section className="subsector-content">
                    <div className="container">
                        <Breadcrumb items={breadcrumbItems} />

                        <div className="subsector-grid stagger">
                            {paginatedItems.map((subSector) => (
                                <CategoryCard
                                    key={subSector.id}
                                    id={`${sectorId}/${subSector.id}`}
                                    name={subSector.name}
                                    tourCount={subSector.tourCount}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default SubSectorPage;
